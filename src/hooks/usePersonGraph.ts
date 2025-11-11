import { useQuery } from '@tanstack/react-query';
import { films, people, starships } from '@/api/swapi';

/**
 * Loads person, then films and starships.
 * Hooks order is stable to avoid "Rendered more hooks" error.
 */
export function usePersonGraph(id: number) {
  const personQuery = useQuery({
    queryKey: ['person', id],
    queryFn: () => people.byId(id),
  });

  const filmsQuery = useQuery({
    queryKey: ['personFilms', id],
    queryFn: async () => {
      if (!personQuery.data) return [];
      const ids = personQuery.data.films ?? [];
      if (!ids.length) return [];
      return Promise.all(ids.map(fid => films.byId(fid)));
    },
    enabled: !!personQuery.data,
  });

  const starshipsQuery = useQuery({
    queryKey: ['personShips', id],
    queryFn: async () => {
      if (!personQuery.data) return [];
      const ids = personQuery.data.starships ?? [];
      if (!ids.length) return [];
      const unique = Array.from(new Set(ids));
      return Promise.all(unique.map(sid => starships.byId(sid)));
    },
    enabled: !!personQuery.data,
  });

  return { personQuery, filmsQuery, starshipsQuery };
}
