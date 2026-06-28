import { TELEGRAM_EXTERNAL_URL } from "../../../lib/outbound-links.js";

export function GET() {
  return Response.redirect(TELEGRAM_EXTERNAL_URL, 302);
}
