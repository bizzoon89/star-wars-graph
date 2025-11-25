import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { useMemo } from 'react';
import { buildGraph } from '@/graph/buildGraph';
import { usePersonGraph } from '@/hooks/usePersonGraph';
import { getIdFromUrl } from '@/api/swapi';

/**
 * Displays a visual graph of a Star Wars character, their related films, and starships.
 * - Fetches all required data via `usePersonGraph`.
 * - Uses React Flow for rendering the connection graph.
 * - Supports both routed and modal rendering via the optional `idProp`.
 *
 *  - Optional character ID (used when rendering inside a modal)
 */

export const PersonGraph = ({ idProp }: { idProp: number }) => {
  const resolvedId = idProp;

  const { personQuery, filmsQuery, starshipsQuery } = usePersonGraph(resolvedId);

  // Build maps and graph in a stable way
  const person = personQuery.data ?? null;
  const filmMap = useMemo(() => new Map((filmsQuery.data ?? []).map(f => [getIdFromUrl(f.url), f])), [filmsQuery.data]);
  const shipMap = useMemo(
    () => new Map((starshipsQuery.data ?? []).map(s => [getIdFromUrl(s.url), s])),
    [starshipsQuery.data]
  );

  const graph = useMemo(() => {
    if (!person) return { nodes: [], edges: [] };
    return buildGraph(
      { id: resolvedId, name: person.name, films: person.films ?? [], starships: person.starships ?? [] },
      filmMap,
      shipMap
    );
  }, [resolvedId, person, filmMap, shipMap]);

  if (personQuery.isError) {
    const message = (personQuery.error as Error)?.message || 'Failed to load hero';
    const is404 = message.includes('404');
    return (
      <div className='container-narrow py-6'>
        <h1 className='text-2xl font-bold text-red-600 mb-3'>Error</h1>
      </div>
    );
  }

  const isLoading = personQuery.isLoading || filmsQuery.isLoading || starshipsQuery.isLoading;

  return (
    <div className='h-full'>
      <header className='flex items-center justify-between mb-3'>
        <h3 className='text-xl font-semibold text-blue-900 mb-2'>{person?.name ?? 'Loading…'}</h3>
      </header>

      <div className='h-[calc(100%-2rem)] min-h-[60vh] rounded border bg-white'>
        {isLoading && <div className='p-4 text-slate-600'>Loading graph…</div>}
        <ReactFlow
          nodes={graph.nodes}
          edges={graph.edges}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};
