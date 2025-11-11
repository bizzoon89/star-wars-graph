import { useInfiniteQuery } from '@tanstack/react-query';
import { people } from '@/api/swapi';

/**
 * Infinite list of people.
 * Uses the server-provided "next" to compute the next page.
 */

export const usePeople = () => {
  return useInfiniteQuery({
    queryKey: ['people'],
    queryFn: ({ pageParam = 1 }) => people.list(pageParam),
    getNextPageParam: lastPage => {
      if (!lastPage.next) return undefined;
      const match = /[?&]page=(\d+)/.exec(lastPage.next);
      return match ? Number(match[1]) : undefined;
    },
    initialPageParam: 1,
  });
};
