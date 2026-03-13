import { Phone, MessageCircle, Cog, Mail, Bot } from 'lucide-react';

export const SKILL_CATALOG = [
  {
    slug: 'ai-receptionist',
    name: 'AI Receptionist',
    tagline: 'Never miss a call again.',
    description: 'AI answers inbound calls, qualifies leads, discusses services and pricing, books appointments, and sends confirmations to Telegram.',
    icon: Phone,
    color: 'cyan',
    priceCents: 4900,
    priceLabel: '$49/mo',
    requiredKeys: [
      { key: 'twilio_phone_number', label: 'Twilio Phone Number', placeholder: '+18001234567' },
    ],
    optionalKeys: [
      { key: 'twilio_account_sid', label: 'Twilio Account SID (for Twilio webhook config)', placeholder: 'ACxxxxxxxx...' },
      { key: 'twilio_auth_token', label: 'Twilio Auth Token', placeholder: 'Your auth token', secret: true },
      { key: 'telegram_bot_token', label: 'Telegram Bot Token (for booking alerts)', placeholder: '123456:ABC-DEF...', secret: true },
      { key: 'telegram_chat_id', label: 'Telegram Chat ID', placeholder: '-100123456789' },
    ],
    hasPersona: true,
    personaPlaceholder: `You are the phone scheduling assistant for [Your Business], a professional [industry] company in [area].\n\nYour job:\n1. Greet callers warmly.\n2. Ask what help they need.\n3. Discuss services and pricing.\n4. Qualify the lead.\n5. Book appointments.\n\nKeep responses SHORT and conversational.`,
    features: [
      '24/7 call answering',
      'Lead qualification',
      'Appointment booking',
      'Telegram notifications',
      'Custom business persona',
      'Pricing discussion',
    ],
  },
  {
    slug: 'ai-telegram-agent',
    name: 'AI Telegram Agent',
    tagline: 'Always-on messaging.',
    description: 'AI handles Telegram messages, answers questions, routes tasks, and sends notifications on your behalf.',
    icon: MessageCircle,
    color: 'violet',
    priceCents: 2900,
    priceLabel: '$29/mo',
    requiredKeys: [
      { key: 'telegram_bot_token', label: 'Telegram Bot Token', placeholder: '123456:ABC-DEF...', secret: true },
      { key: 'telegram_chat_id', label: 'Telegram Chat / Group ID', placeholder: '-100123456789' },
    ],
    optionalKeys: [],
    hasPersona: true,
    personaPlaceholder: `You are the virtual assistant for [Your Business].\n\nYou help with:\n- Answering common questions\n- Scheduling and reminders\n- Routing tasks to the right person\n\nBe helpful, concise, and professional.`,
    features: [
      'Instant message replies',
      'Business FAQ handling',
      'Task routing',
      'Group chat support',
      'Custom persona',
    ],
  },
  {
    slug: 'task-automation',
    name: 'Task Automation',
    tagline: 'Run ops on autopilot.',
    description: 'Autonomous watcher processes tasks from an inbox, executes them via AI agents, and reports results back.',
    icon: Cog,
    color: 'yellow',
    priceCents: 9900,
    priceLabel: '$99/mo',
    requiredKeys: [
      { key: 'telegram_bot_token', label: 'Telegram Bot Token (for status updates)', placeholder: '123456:ABC-DEF...', secret: true },
      { key: 'telegram_chat_id', label: 'Telegram Chat ID', placeholder: '-100123456789' },
    ],
    optionalKeys: [],
    hasPersona: false,
    features: [
      'Autonomous task execution',
      'Inbox processing',
      'Scheduled jobs',
      'Completion notifications',
      'Daily budget caps',
      'Retry with backoff',
    ],
  },
  {
    slug: 'google-workspace',
    name: 'Google Workspace',
    tagline: 'Email, calendar, and drive.',
    description: 'AI manages your Gmail, Calendar, and Drive -- reads emails, checks schedules, and organizes files.',
    icon: Mail,
    color: 'emerald',
    priceCents: 4900,
    priceLabel: '$49/mo',
    requiredKeys: [
      { key: 'google_credentials_json', label: 'Google Service Account JSON', placeholder: '{"type":"service_account",...}', secret: true },
    ],
    optionalKeys: [
      { key: 'telegram_bot_token', label: 'Telegram Bot Token (for alerts)', placeholder: '123456:ABC-DEF...', secret: true },
      { key: 'telegram_chat_id', label: 'Telegram Chat ID', placeholder: '-100123456789' },
    ],
    hasPersona: false,
    features: [
      'Email reading and drafting',
      'Calendar management',
      'Drive file organization',
      'Meeting summaries',
      'Telegram notifications',
    ],
  },
  {
    slug: 'custom-agent',
    name: 'Custom Agent',
    tagline: 'Build your own.',
    description: 'Design a custom AI agent with your own persona, tools, and integrations. Full flexibility.',
    icon: Bot,
    color: 'rose',
    priceCents: 14900,
    priceLabel: '$149/mo',
    requiredKeys: [],
    optionalKeys: [
      { key: 'telegram_bot_token', label: 'Telegram Bot Token', placeholder: '123456:ABC-DEF...', secret: true },
      { key: 'telegram_chat_id', label: 'Telegram Chat ID', placeholder: '-100123456789' },
      { key: 'twilio_account_sid', label: 'Twilio Account SID (optional)', placeholder: 'ACxxxxxxxx...' },
      { key: 'twilio_auth_token', label: 'Twilio Auth Token (optional)', placeholder: 'Your auth token', secret: true },
    ],
    hasPersona: true,
    personaPlaceholder: `Define your agent's personality, capabilities, and behavior here.\n\nInclude:\n- Who the agent represents\n- What it can help with\n- Tone and style\n- Any specific rules or boundaries`,
    features: [
      'Fully custom persona',
      'Multi-channel support',
      'Custom tool integrations',
      'Priority support',
    ],
  },
];

export const COLOR_MAP = {
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    glow: 'hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)]',
    iconBg: 'bg-cyan-500/15',
    badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    button: 'bg-cyan-500 hover:bg-cyan-400 text-black',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    glow: 'hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)]',
    iconBg: 'bg-violet-500/15',
    badge: 'bg-violet-500/20 text-violet-400 border-violet-500/40',
    button: 'bg-violet-500 hover:bg-violet-400 text-white',
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    glow: 'hover:shadow-[0_8px_30px_rgba(234,179,8,0.12)]',
    iconBg: 'bg-yellow-500/15',
    badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
    button: 'bg-yellow-500 hover:bg-yellow-400 text-black',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    glow: 'hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]',
    iconBg: 'bg-emerald-500/15',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    button: 'bg-emerald-500 hover:bg-emerald-400 text-black',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    glow: 'hover:shadow-[0_8px_30px_rgba(244,63,94,0.12)]',
    iconBg: 'bg-rose-500/15',
    badge: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    button: 'bg-rose-500 hover:bg-rose-400 text-white',
  },
};

export function getSkillBySlug(slug) {
  return SKILL_CATALOG.find((s) => s.slug === slug) || null;
}

/** Outright Landscape phone persona — use for 888 demo */
export const OUTRIGHT_LANDSCAPE_PERSONA = `You are the phone scheduling assistant for Outright Landscape, a professional landscaping and irrigation company in the San Gabriel Valley and San Diego area.

Your job on this call:
1. Greet the caller warmly and professionally.
2. Ask what kind of landscaping or irrigation help they need.
3. Discuss services and give ballpark price ranges when asked:
   - Irrigation systems: $800–$3,000+ depending on property size
   - Lawn care / maintenance: $60–$150/visit
   - Hardscape (patios, walkways, retaining walls): $2,000–$15,000+
   - Sprinkler repair: $75–$250 per service call
4. Qualify the lead: ask about property type (residential/commercial), size, job urgency, and location.
5. When the caller wants to book, collect: full name, property address, preferred date and time.
6. Always suggest appointment times that allow 1–2 hours travel time for the crew to arrive after their current location.
7. When booking is fully confirmed by the caller, output this exact JSON on its own line at the end of your response:
   {"booking":{"name":"...","address":"...","service":"...","date":"...","time":"...","notes":"..."}}
8. Be friendly, concise, and professional. Never promise exact prices without an in-person estimate.
9. If the caller is not interested or the call is wrapping up, say goodbye warmly.

IMPORTANT: Keep responses SHORT and conversational. This is a phone call — no bullet points, no headers, just natural spoken language.`;

/** Persona presets for AI Receptionist — select to auto-fill */
export const PERSONA_PRESETS = {
  'outright-landscape': {
    label: 'Outright Landscape',
    persona: OUTRIGHT_LANDSCAPE_PERSONA,
  },
  'outright-demo': {
    label: 'Outright Demo (888)',
    persona: OUTRIGHT_LANDSCAPE_PERSONA,
    /** Full config to apply when "Use Outright Demo" is clicked */
    config: {
      twilio_phone_number: '+18882738659',
      _persona: OUTRIGHT_LANDSCAPE_PERSONA,
    },
  },
};
