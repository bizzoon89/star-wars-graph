import type { Page, Person, Film, Starship } from '@/types';
import { json } from './client';

/** API wrapper for Star Wars entities (people, films, starships). */
export const people = {
  list: (page = 1) => json<Page<Person>>(`/people/?page=${page}`),
  byId: (id: number) => json<Person>(`/people/${id}/`),
};

export const films = {
  byId: (id: number) => json<Film>(`/films/${id}/`),
};

export const starships = {
  byId: (id: number) => json<Starship>(`/starships/${id}/`),
};

/** Extract numeric ID from a SWAPI resource URL. */
export const getIdFromUrl = (url: string): number => Number(url.replace(/.*\/(\d+)\/?$/, '$1'));
