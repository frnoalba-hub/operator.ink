/**
 * Cloudflare Worker entry for AI Receptionist.
 * Deploy: npx wrangler deploy
 * Twilio webhook: https://operator-ink-voice.<subdomain>.workers.dev
 */
import { handleTwilioVoice } from "../functions/twilioVoice";

type Env = Record<string, string | undefined>;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handleTwilioVoice(request, env);
  },
};
