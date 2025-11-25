import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

// --- Mock usePeople BEFORE imports ---
const mockedUsePeople = vi.fn();
vi.mock('@/hooks/usePeople', () => ({
  usePeople: (...args: any[]) => mockedUsePeople(...args),
}));

vi.mock('@/components/Loader', () => ({
  Loader: () => <div data-testid='loader'>Loading...</div>,
}));

vi.mock('@/components/Modal', () => ({
  Modal: ({ children }: { children: React.ReactNode }) => <div data-testid='modal'>{children}</div>,
}));

vi.mock('@/features/PersonGraph', () => ({
  PersonGraph: ({ idProp }: { idProp: number }) => <div data-testid='person-graph'>Graph for {idProp}</div>,
}));

// --- Import after mocks ---
import { PeopleList } from '../PeopleList';

// --- Helper ---
function renderWithClient(ui: React.ReactElement) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
}

describe('PeopleList component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    mockedUsePeople.mockReturnValue({
      isLoading: true,
      isError: false,
    });

    renderWithClient(<PeopleList />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error state and can retry', () => {
    const refetch = vi.fn();
    mockedUsePeople.mockReturnValue({
      isLoading: false,
      isError: true,
      error: new Error('Network down'),
      refetch,
    });

    renderWithClient(<PeopleList />);
    expect(screen.getByText(/Failed to load people/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Retry/i));
    expect(refetch).toHaveBeenCalled();
  });

  it('renders people and opens modal on button click', async () => {
    mockedUsePeople.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        pages: [
          {
            results: [
              { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
              { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
            ],
          },
        ],
      },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    renderWithClient(<PeopleList />);

    expect(await screen.findByText(/Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText(/Darth Vader/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Open details for Luke Skywalker/i }));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('person-graph')).toHaveTextContent('Graph for 1');
  });
});
