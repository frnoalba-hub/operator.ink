/**
 * JSON-LD Schema definitions for GEO (Generative Engine Optimization).
 * Makes Operator.ink entity and services machine-readable for AI models.
 */

const BASE_URL = 'https://operator.ink';

const LINKEDIN_FOUNDER = 'https://www.linkedin.com/in/franciscoalbavc/';

/** Authoritative citation URLs for GEO Glossary (Cite Sources — KDD '24 ~30% visibility lift) */
export const GEO_CITATION_URLS = {
  kddPaper: 'https://doi.org/10.1145/3637528.3671900',
  googleEeat: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content',
  generativeEngines: 'https://generative-engines.com/GEO/',
};

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Operator.ink',
  url: BASE_URL,
  logo: `${BASE_URL}/operator-logo.png`,
  description: 'Operator.ink is a digital operations agency building AI workflows, automated systems, operational websites, and GEO/AEO/SEO strategies across 6 concurrent business lines.',
  email: 'orders@operator.ink',
  founder: {
    '@type': 'Person',
    name: 'Francisco Alba',
    url: LINKEDIN_FOUNDER,
    sameAs: [LINKEDIN_FOUNDER],
  },
  publisher: { '@id': `${BASE_URL}/#organization` },
  sameAs: [LINKEDIN_FOUNDER],
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
        text: 'Brief (share scope and goals) → Discovery (we map your ops and audience) → Build (sprints with check-ins) → Launch (handoff, docs, ongoing support). When scope fits, we validate with a focused sprint before full build.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Generative Engine Optimization (GEO)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generative Engine Optimization (GEO) is the practice of optimizing web content so AI systems like ChatGPT, Perplexity, and Google AI Overviews select, cite, and quote your content in synthesized answers. GEO extends traditional SEO for the AI era—content is structured for machine extraction and authoritative citation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Operator.ink work with healthcare companies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Operator.ink works with healthcare and regulated industries. All demos and pilots use synthetic data only—no real PHI or patient names. Client data is encrypted in transit and at rest. We design for HIPAA considerations from the start.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does pricing work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every engagement is scoped after Brief and Discovery. Full sites typically start in the $5,000–$15,000 range depending on pages, integrations, and custom features. We provide a written quote before build.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Operator.ink charge for web design?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Web design projects vary by scope. Full sites typically start in the $5,000–$15,000 range depending on pages, integrations, and custom features. We provide a custom quote after Brief and Discovery.',
      },
    },
  ],
};

/** HowTo schema — GEO: answers "How does Operator.ink work?" for AI extraction */
export const HOWTO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How does Operator.ink work?',
  description: 'Operator.ink follows a 4-step process: Brief, Discovery, Build, Launch. Focused validation sprints are available when scope warrants them.',
  totalTime: 'P30D',
  step: [
    { '@type': 'HowToStep', name: 'Brief', text: 'Share your scope, goals, and constraints. We align on outcomes and timeline.' },
    { '@type': 'HowToStep', name: 'Discovery', text: 'We map your ops, audience, and tech. You get a clear deployment plan.' },
    { '@type': 'HowToStep', name: 'Build', text: 'Sprints, check-ins, and iterative delivery. You see progress, we ship.' },
    { '@type': 'HowToStep', name: 'Launch', text: 'Handoff, docs, and ongoing support. Systems active, you stay in control.' },
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
    {
      '@type': 'Question',
      name: 'How much does Operator.ink charge for web design?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Web design projects vary by scope. Full sites typically start in the $5,000–$15,000 range. We provide a custom quote after Brief and Discovery.',
      },
    },
  ],
};
