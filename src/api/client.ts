export const API_URL = 'https://sw-api.starnavi.io';

/**
 * Generic JSON fetch helper.
 * Throws a detailed error if response is not OK.
 */

export async function json<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { ...init });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${res.statusText}\n${text}`);
  }

  return res.json() as Promise<T>;
}
