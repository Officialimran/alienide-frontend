/**
 * Thin fetch wrapper for the Laravel public API.
 *
 * - GET requests are cached by Next.js and revalidated every
 *   API_REVALIDATE_SECONDS (ISR), so CMS edits show up without a rebuild.
 * - Errors are thrown as ApiError with the HTTP status and Laravel's
 *   validation errors (422) when present.
 */

export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api/v1").replace(/\/+$/, "");

/** Origin of the backend (e.g. http://127.0.0.1:8000), used to resolve media paths. */
export const API_ORIGIN = new URL(API_BASE_URL).origin;

const REVALIDATE_SECONDS = Number(process.env.API_REVALIDATE_SECONDS ?? 60);

export type QueryValue = string | number | boolean | null | undefined | string[];
export type Query = Record<string, QueryValue>;

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly errors: Record<string, string[]> = {},
  ) {
    super(message);
    this.name = "ApiError";
  }

  get isNotFound() {
    return this.status === 404;
  }
}

export function buildApiUrl(path: string, query?: Query): string {
  const url = new URL(`${API_BASE_URL}/${path.replace(/^\/+/, "")}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value === undefined || value === null || value === "" || value === false) continue;
    const v = Array.isArray(value) ? value.filter(Boolean).join(",") : value === true ? "1" : String(value);
    if (v) url.searchParams.set(key, v);
  }
  return url.toString();
}

async function toApiError(res: Response): Promise<ApiError> {
  let message = `Request failed with status ${res.status}`;
  let errors: Record<string, string[]> = {};
  try {
    const body = (await res.json()) as { message?: string; errors?: Record<string, string[]> };
    if (body.message) message = body.message;
    if (body.errors) errors = body.errors;
  } catch {
    // Non-JSON error body (e.g. an HTML 500 page): keep the generic message.
  }
  return new ApiError(res.status, message, errors);
}

interface GetOptions {
  query?: Query;
  /** Cache tags, for on-demand revalidation with revalidateTag(). */
  tags?: string[];
  revalidate?: number | false;
}

/** Cached GET (server side). Throws ApiError on any non-2xx response. */
export async function apiGet<T>(path: string, { query, tags, revalidate = REVALIDATE_SECONDS }: GetOptions = {}): Promise<T> {
  const res = await fetch(buildApiUrl(path, query), {
    headers: { Accept: "application/json" },
    next: { revalidate, tags: ["cms", ...(tags ?? [])] },
  });
  if (!res.ok) throw await toApiError(res);
  return (await res.json()) as T;
}

/** Like apiGet, but resolves to null when the resource does not exist (404). */
export async function apiGetOrNull<T>(path: string, options?: GetOptions): Promise<T | null> {
  try {
    return await apiGet<T>(path, options);
  } catch (error) {
    if (error instanceof ApiError && error.isNotFound) return null;
    throw error;
  }
}

/** JSON POST (used by the website forms in the browser). */
export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(buildApiUrl(path), {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await toApiError(res);
  return (await res.json()) as T;
}
