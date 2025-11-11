import type { Film, Starship } from '@/types';

/** React Flow node shape used by the graph. */
export type RFNode = { id: string; data: any; position: { x: number; y: number }; type?: string };
/** React Flow edge shape used by the graph. */
export type RFEdge = { id: string; source: string; target: string };
/** Nodes and edges bundle. */
export type Graph = { nodes: RFNode[]; edges: RFEdge[] };

/**
 * Builds a visual graph representing a person, their films, and related starships.
 * Each film and starship becomes a node connected by edges.
 *
 * person - Character data with film and starship IDs
 * filmMap - Map of film IDs to film objects
 * shipMap - Map of starship IDs to starship objects
 * Graph structure containing nodes and edges for React Flow
 */

export const buildGraph = (
  person: { id: number; name: string; films: number[]; starships: number[] },
  filmMap: Map<number, Film>,
  shipMap: Map<number, Starship>
): Graph => {
  const nodes: RFNode[] = [
    { id: `person-${person.id}`, data: { label: person.name }, position: { x: 0, y: 0 }, type: 'input' },
  ];
  const edges: RFEdge[] = [];

  let y = 150;
  let xFilm = -240;
  for (const fid of person.films) {
    const film = filmMap.get(fid);
    if (!film) continue;

    const filmNodeId = `film-${fid}`;
    nodes.push({ id: filmNodeId, data: { label: film.title }, position: { x: (xFilm += 240), y } });
    edges.push({ id: `edge-person-${fid}`, source: `person-${person.id}`, target: filmNodeId });

    // only ships actually used by the person in this film
    const matched = film.starships.filter(sid => person.starships.includes(sid));
    let xShip = xFilm - 80;
    const yShip = y + 160;
    for (const sid of matched) {
      const ship = shipMap.get(sid);
      if (!ship) continue;
      const shipNodeId = `ship-${sid}-${fid}`;
      nodes.push({ id: shipNodeId, data: { label: ship.name }, position: { x: (xShip += 140), y: yShip } });
      edges.push({ id: `edge-${fid}-${sid}`, source: filmNodeId, target: shipNodeId });
    }
  }

  return { nodes, edges };
};
