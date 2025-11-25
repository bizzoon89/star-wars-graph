import { useQuery } from '@tanstack/react-query';
import { films } from '@/api/swapi';

export const useFilms = (ids: number[] | undefined) => {
  const uniqueIds = ids ? Array.from(new Set(ids)) : [];

  return useQuery({
    queryKey: ['films', uniqueIds],
    queryFn: () => films.byIds(uniqueIds),
    enabled: uniqueIds.length > 0,
  });
};
