/** Generic pagination envelope for SWAPI list endpoints. */
export interface Page<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/** Minimal person shape used in this assignment. */
export interface Person {
  name: string;
  films: number[];
  starships: number[];
  url: string;
}

export interface Film {
  title: string;
  starships: number[];
  url: string;
}

export interface Starship {
  name: string;
  url: string;
}
