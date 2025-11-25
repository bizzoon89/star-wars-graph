import type { Page, Person, Film, Starship } from '@/types';
import { json } from './client';

/** API wrapper for Star Wars entities (people, films, starships). */
export const people = {
  list: (page = 1) => json<Page<Person>>(`/people/?page=${page}`),
  byId: (id: number) => json<Person>(`/people/${id}/`),
};

export const films = {
  byId: (id: number) => json<Film>(`/films/${id}/`),

  byIds: (ids: number[]) => {
    if (!ids.length) return Promise.resolve([]);
    const idsParam = ids.join(',');
    return json<{ results: Film[] }>(`/films/?id__in=${idsParam}`).then(res => res.results);
  },
};

export const starships = {
  byId: (id: number) => json<Starship>(`/starships/${id}/`),

  byIds: (ids: number[]) => {
    if (!ids.length) return Promise.resolve([]);
    const idsParam = ids.join(',');
    return json<{ results: Starship[] }>(`/starships/?id__in=${idsParam}`).then(res => res.results);
  },
};

/** Extract numeric ID from a SWAPI resource URL. */
export const getIdFromUrl = (url: string): number => Number(url.replace(/.*\/(\d+)\/?$/, '$1'));
