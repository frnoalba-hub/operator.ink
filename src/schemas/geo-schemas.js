/**
 * JSON-LD Schema definitions for GEO (Generative Engine Optimization).
 * Makes Operator.ink entity and services machine-readable for AI models.
 */

const BASE_URL = 'https://operator.ink';

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Operator.ink',
  url: BASE_URL,
  logo: `${BASE_URL}/operator-logo.png`,
  description: 'Operator.ink builds operational websites, GEO/AEO/SEO search strategies, AI workflows, and ads. Digital operations and growth systems for businesses serious about scalable growth.',
  email: 'orders@operator.ink',
  sameAs: [
    'https://www.linkedin.com/in/francisco-albavc/',
  ],
};

export const SERVICE_SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Web Design & Operations',
    description: 'Conversion-first operational websites engineered for speed, performance, and scalable growth. We build operational systems that generate leads and revenue.',
    provider: { '@id': `${BASE_URL}/#organization` },
    audience: { '@type': 'Audience', audienceType: 'Business owners and operators seeking high-converting web presence' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'GEO, AEO & SEO Search',
    description: 'Localized search strategies and content engineering to capture high-intent demand. Generative Engine Optimization and Answer Engine Optimization to appear in AI-generated summaries and featured snippets.',
    provider: { '@id': `${BASE_URL}/#organization` },
    audience: { '@type': 'Audience', audienceType: 'Businesses wanting visibility in traditional search, AI answers, and voice search' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Workflows & AI Agents',
    description: 'Custom automation and intelligent agents to eliminate manual tasks and lower cost-per-action. AI customer support, lead capture, document processing.',
    provider: { '@id': `${BASE_URL}/#organization` },
    audience: { '@type': 'Audience', audienceType: 'Teams drowning in manual work who need scalable automation' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ads & Brand Identity',
    description: 'Cohesive brand assets plus precision ad campaigns for scalable acquisition and efficient CAC. Logo, visual identity, Google Ads, Meta Ads, LinkedIn Ads.',
    provider: { '@id': `${BASE_URL}/#organization` },
    audience: { '@type': 'Audience', audienceType: 'Businesses needing brand clarity and paid acquisition' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Base44 Setup & Consultation',
    description: 'Get your own high-converting platform running on Base44. Environment architecture, operational workflow design, system integration planning, and 1-on-1 setup consultation.',
    provider: { '@id': `${BASE_URL}/#organization` },
    audience: { '@type': 'Audience', audienceType: 'Businesses wanting to deploy on Base44 with expert guidance' },
  },
];

export const FAQ_SCHEMA_HOME = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Operator.ink offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Operator.ink offers premium website design, managed fast hosting, conversion-focused sites, GEO and AEO search optimization, AI agents and workflows, precision ads, client portal for asset uploads, and compliance-aware solutions safe for healthcare.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Operator.ink process work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Brief (share scope and goals) → Discovery (we map your ops and audience) → Build (sprints with check-ins) → Launch (handoff, docs, ongoing support). We start with Phase-0 Pilot when it fits to validate fast, then scale.',
      },
    },
  ],
};

export const FAQ_SCHEMA_SERVICES = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Operator.ink safe for healthcare and regulated industries?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Demos and pilots use synthetic data only—no real PHI or patient names. Client data is encrypted in transit and at rest, access-controlled, and only used for agreed scope. For healthcare: we design for HIPAA considerations from the start.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is GEO and AEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GEO (Generative Engine Optimization) means optimizing content to appear in AI-generated summaries (e.g., ChatGPT, Perplexity). AEO (Answer Engine Optimization) means capturing featured snippets and voice search. Both extend traditional SEO for the AI era.',
      },
    },
  ],
};
