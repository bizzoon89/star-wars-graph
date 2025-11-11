import { useCallback, useMemo, useState } from 'react';
import { usePeople } from '@/hooks/usePeople';
import { getIdFromUrl } from '@/api/swapi';
import { Modal } from '@/components/Modal';
import { PersonGraph } from '@/features/PersonGraph';
import { Button } from '@/components/Button';
import { Loader } from '@/components/Loader';
import { InfiniteList } from '@/components/InfiniteList';

/**
 * People list:
 * - Responsive grid
 * - Infinite scroll + loader
 * - Details in a modal (no page reload)
 */

export const PeopleList = () => {
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);

  // Fetch paginated people list
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch } = usePeople();

  const items = useMemo(() => data?.pages.flatMap(p => p.results) ?? [], [data]);

  const handleReachEnd = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Loading state
  if (isLoading) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <Loader />
        <p className='text-indigo-600 mt-2 text-lg'>Loading people...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className='container-narrow py-10 text-center'>
        <p className='text-red-600'>Failed to load people: {(error as Error).message}</p>
        <Button
          variant='retry'
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }

  // Normal list
  return (
    <div className='container-narrow py-6 space-y-6'>
      <header className='flex flex-col md:flex-row items-start md:items-center justify-between gap-3'>
        <h1 className='text-2xl font-bold'>Star Wars — People</h1>
      </header>

      <InfiniteList onReachEnd={handleReachEnd}>
        <ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {items.map(p => (
            <li
              key={p.url}
              className='rounded border bg-white p-3 hover:shadow transition-shadow'
            >
              <div className='text-lg font-medium text-blue-800 mb-4'>{p.name}</div>
              <Button
                onClick={() => setSelectedPersonId(getIdFromUrl(p.url))}
                aria-label={`Open details for ${p.name}`}
              >
                View graph
              </Button>
            </li>
          ))}
        </ul>

        {isFetchingNextPage && <Loader />}
        {!hasNextPage && items.length > 0 && <p className='mt-4 text-center text-slate-500'>End of list</p>}
      </InfiniteList>

      {selectedPersonId !== null && (
        <Modal
          title='Hero details'
          onClose={() => setSelectedPersonId(null)}
        >
          <div className='h-[70vh]'>
            <PersonGraph idProp={selectedPersonId} />
          </div>
        </Modal>
      )}
    </div>
  );
};
