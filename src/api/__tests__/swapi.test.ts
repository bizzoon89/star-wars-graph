import { people, films, starships, getIdFromUrl } from '@/api/swapi';
import { vi, beforeEach, describe, it, expect } from 'vitest';

/** Unit tests for SWAPI API helpers (mocked fetch). */

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  vi.stubGlobal('fetch', mockFetch);
});

describe('swapi API helpers', () => {
  it('fetches list of people', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [{ name: 'Luke Skywalker' }] }),
    } as Response);

    const data = await people.list(1);
    expect(data.results[0].name).toBe('Luke Skywalker');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('people/?page=1'), expect.any(Object));
  });

  it('fetches single person by id', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Darth Vader' }),
    } as Response);

    const person = await people.byId(2);
    expect(person.name).toBe('Darth Vader');
  });

  it('fetches film data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ title: 'A New Hope' }),
    } as Response);

    const film = await films.byId(1);
    expect(film.title).toBe('A New Hope');
  });

  it('fetches starship data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'X-Wing' }),
    } as Response);

    const ship = await starships.byId(12);
    expect(ship.name).toBe('X-Wing');
  });

  it('throws error when response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: async () => 'Not Found',
    } as Response);

    await expect(people.byId(999)).rejects.toThrow();
  });

  it('extracts id from URL correctly', () => {
    const id = getIdFromUrl('https://swapi.dev/api/people/5/');
    expect(id).toBe(5);
  });
});
