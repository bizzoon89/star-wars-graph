import { useQuery } from '@tanstack/react-query';
import { starships } from '@/api/swapi';

export const useStarships = (ids: number[] | undefined) => {
  const uniqueIds = ids ? Array.from(new Set(ids)) : [];

  return useQuery({
    queryKey: ['starships', uniqueIds],
    queryFn: () => starships.byIds(uniqueIds),
    enabled: uniqueIds.length > 0,
  });
};
