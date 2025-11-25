import { usePerson } from './usePerson';
import { useFilms } from './useFilms';
import { useStarships } from './useStarships';

/**
 * Loads person, then films and starships.
 * Hooks order is stable to avoid "Rendered more hooks" error.
 */
export const usePersonGraph = (id: number) => {
  const personQuery = usePerson(id);

  const filmsQuery = useFilms(personQuery.data?.films);
  const starshipsQuery = useStarships(personQuery.data?.starships);

  return { personQuery, filmsQuery, starshipsQuery };
};
