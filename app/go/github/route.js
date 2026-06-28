import { GITHUB_EXTERNAL_URL } from "../../../lib/outbound-links.js";

export function GET() {
  return Response.redirect(GITHUB_EXTERNAL_URL, 302);
}
