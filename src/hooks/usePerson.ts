import { useQuery } from '@tanstack/react-query';
import { people } from '@/api/swapi';

export const usePerson = (id: number) => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => people.byId(id),
  });
};
