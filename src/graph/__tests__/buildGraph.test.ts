import { buildGraph } from '../buildGraph';

describe('buildGraph', () => {
  const mockPerson = {
    id: 1,
    name: 'Luke Skywalker',
    films: [1, 2],
    starships: [10, 20],
  };

  const mockFilmMap = new Map([
    [1, { title: 'A New Hope', starships: [10, 20], url: 'https://swapi.dev/api/films/1/' }],
    [2, { title: 'The Empire Strikes Back', starships: [30], url: 'https://swapi.dev/api/films/2/' }],
  ]);

  const mockShipMap = new Map([
    [10, { name: 'X-Wing', url: 'https://swapi.dev/api/starships/10/' }],
    [20, { name: 'Millennium Falcon', url: 'https://swapi.dev/api/starships/20/' }],
    [30, { name: 'TIE Fighter', url: 'https://swapi.dev/api/starships/30/' }],
  ]);

  it('builds correct nodes and edges for films and starships', () => {
    const { nodes, edges } = buildGraph(mockPerson, mockFilmMap, mockShipMap);

    // Should create at least one node
    expect(nodes.length).toBeGreaterThan(0);

    // Should contain the main person node
    expect(nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'person-1',
          data: expect.objectContaining({ label: 'Luke Skywalker' }),
        }),
      ])
    );

    //  Should contain at least one film node
    expect(nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'film-1',
          data: expect.objectContaining({ label: 'A New Hope' }),
        }),
      ])
    );

    // Should contain starship nodes related to the person
    expect(nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          data: expect.objectContaining({ label: 'X-Wing' }),
        }),
        expect.objectContaining({
          data: expect.objectContaining({ label: 'Millennium Falcon' }),
        }),
      ])
    );

    // Should create edges connecting person → film and film → starship
    expect(edges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ source: 'person-1', target: 'film-1' }),
        expect.objectContaining({ source: 'film-1', target: expect.stringMatching(/^ship-/) }),
      ])
    );
  });

  it('returns only person node when there are no films', () => {
    const emptyPerson = { id: 2, name: 'Obi-Wan Kenobi', films: [], starships: [] };
    const { nodes, edges } = buildGraph(emptyPerson, mockFilmMap, mockShipMap);

    expect(nodes).toHaveLength(1);
    expect(nodes[0].id).toBe('person-2');
    expect(edges).toHaveLength(0);
  });
});
