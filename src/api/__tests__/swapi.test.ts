import { people, films, starships, getIdFromUrl } from '@/api/swapi';

/** Unit tests for SWAPI API helpers (mocked fetch). */

describe('swapi API helpers', () => {
  beforeEach(() => {
    (fetch as any).mockClear();
  });

  it('fetches list of people', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [{ name: 'Luke Skywalker' }] }),
    });

    const data = await people.list(1);
    expect(data.results[0].name).toBe('Luke Skywalker');

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('people/?page=1'), expect.any(Object));
  });

  it('fetches single person by id', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'Darth Vader' }),
    });

    const person = await people.byId(2);
    expect(person.name).toBe('Darth Vader');
  });

  it('fetches film data', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ title: 'A New Hope' }),
    });

    const film = await films.byId(1);
    expect(film.title).toBe('A New Hope');
  });

  it('fetches starship data', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: 'X-Wing' }),
    });

    const ship = await starships.byId(12);
    expect(ship.name).toBe('X-Wing');
  });

  it('throws error when response is not ok', async () => {
    (fetch as any).mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(people.byId(999)).rejects.toThrow();
  });

  it('extracts id from URL correctly', () => {
    const id = getIdFromUrl('https://swapi.dev/api/people/5/');
    expect(id).toBe(5);
  });
});
