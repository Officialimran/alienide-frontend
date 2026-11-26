import { apiPost } from "./client";
import type { SuggestionPayload } from "./types";

/**
 * POST /v1/suggests — the website's feedback form.
 * The backend validates (422 with field errors), stores the
 * submission and emails it to the site owner. Throttled to 10/min.
 */
export function submitSuggestion(payload: SuggestionPayload) {
  return apiPost<{ status: boolean; message: string }>("suggests", payload);
}
