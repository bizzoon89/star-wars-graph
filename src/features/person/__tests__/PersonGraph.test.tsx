// src/features/person/__tests__/PersonGraph.test.tsx
import { vi } from 'vitest';
import type { Mock } from 'vitest';

// --- Mock ReactFlow to avoid ResizeObserver/DOM issues in jsdom ---
vi.mock('reactflow', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid='reactflow'>{children}</div>,
  Background: () => <div data-testid='rf-bg' />,
  Controls: () => <div data-testid='rf-ctrl' />,
}));

// --- Mock the data hook BEFORE importing the component under test ---
vi.mock('@/hooks/usePersonGraph', () => ({
  usePersonGraph: vi.fn(() => ({
    personQuery: {
      data: { name: 'Luke Skywalker', films: [1], starships: [10] },
      isLoading: false,
      isError: false,
      error: null,
    },
    filmsQuery: {
      // IMPORTANT: include starships array to satisfy buildGraph
      data: [{ title: 'A New Hope', url: 'https://swapi.dev/api/films/1/', starships: [10] }],
      isLoading: false,
    },
    starshipsQuery: {
      data: [{ name: 'X-Wing', url: 'https://swapi.dev/api/starships/10/' }],
      isLoading: false,
    },
  })),
}));

import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PersonGraph from '../PersonGraph';
import { usePersonGraph } from '@/hooks/usePersonGraph';

// --- Helper: render with a stable React Query client (no retries/suspense) ---
function renderWithClient(ui: React.ReactElement) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
}

describe('PersonGraph component', () => {
  it('renders graph header with person name', async () => {
    renderWithClient(<PersonGraph idProp={1} />);
    // Wait for the name to appear to avoid initial render races
    expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
    // ReactFlow is mounted (mocked)
    expect(screen.getByTestId('reactflow')).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    // Override mocked hook for this test only
    (usePersonGraph as unknown as Mock).mockReturnValueOnce({
      personQuery: { data: null, isLoading: true, isError: false, error: null },
      filmsQuery: { data: [], isLoading: true },
      starshipsQuery: { data: [], isLoading: true },
    });

    renderWithClient(<PersonGraph idProp={1} />);
    expect(screen.getByText(/Loading graph/i)).toBeInTheDocument();
  });
});
