import { ZodType } from 'zod';
import { EndpointKey, endpoints } from './endpoints';
import { TokenPayload, TokenSchema } from './schemas';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

let tokenCache: TokenPayload | null = null;

const isBrowser = typeof window !== 'undefined';

function cargarTokens(): TokenPayload | null {
  if (!isBrowser) return tokenCache;
  const raw = window.localStorage.getItem('cumbre_tokens');
  if (!raw) return tokenCache;
  try {
    tokenCache = TokenSchema.parse(JSON.parse(raw));
  } catch {
    tokenCache = null;
  }
  return tokenCache;
}

function persistirTokens(tokens: TokenPayload | null) {
  tokenCache = tokens;
  if (!isBrowser) return;
  if (tokens) {
    window.localStorage.setItem('cumbre_tokens', JSON.stringify(tokens));
  } else {
    window.localStorage.removeItem('cumbre_tokens');
  }
}

export function setTokens(tokens: TokenPayload) {
  persistirTokens(tokens);
}

export function clearTokens() {
  persistirTokens(null);
}

type FetchOpts<T> = {
  body?: unknown;
  params?: Record<string, string | number>;
  query?: Record<string, string | number | undefined>;
  schema?: ZodType<T, any, unknown>;
  reintentos?: number;
};

function compilarPath(path: string, params?: Record<string, string | number>) {
  if (!params) return path;
  return Object.entries(params).reduce((acc, [key, value]) => acc.replace(`:${key}`, encodeURIComponent(String(value))), path);
}

function construirQuery(query?: Record<string, string | number | undefined>) {
  if (!query) return '';
  const qs = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v === undefined) return;
    qs.append(k, String(v));
  });
  const built = qs.toString();
  return built ? `?${built}` : '';
}

export async function apiFetch<T = unknown>(key: EndpointKey, opts: FetchOpts<T> = {}): Promise<T> {
  const def = endpoints[key];
  const path = compilarPath(def.path, opts.params) + construirQuery(opts.query);
  const url = `${API_URL}${path}`;
  const tokens = cargarTokens();

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (tokens?.accessToken) headers.Authorization = `Bearer ${tokens.accessToken}`;

  const res = await fetch(url, {
    method: def.method,
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    cache: 'no-store',
  });

  if (res.status === 401 && tokens?.refreshToken && (opts.reintentos ?? 0) < 1) {
    const refreshed = await intentarRefresh(tokens.refreshToken);
    if (refreshed) {
      return apiFetch(key, { ...opts, reintentos: (opts.reintentos ?? 0) + 1 });
    }
  }

  if (!res.ok) {
    const detalle = await res.text();
    throw new Error(`Error ${res.status} en ${key}: ${detalle}`);
  }

  const data = (await res.json()) as unknown;
  if (opts.schema) return opts.schema.parse(data);
  return data as T;
}

async function intentarRefresh(refreshToken: string) {
  try {
    const res = await fetch(`${API_URL}${endpoints.refresh.path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return false;
    const data = TokenSchema.parse(await res.json());
    setTokens(data);
    return true;
  } catch (err) {
    console.error('Fallo refresh token', err);
    clearTokens();
    return false;
  }
}
