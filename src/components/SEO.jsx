import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://operator.ink';
const DEFAULT_OG_IMAGE = `${BASE_URL}/operator-logo.png`;

/**
 * SEO component for GEO (Generative Engine Optimization).
 * Manages document head and injects JSON-LD schema for AI model recognition.
 * No geolocation meta tags — Operator.ink targets global digital audiences.
 *
 * @param {string} title - Page title (natural, conversational)
 * @param {string} description - Meta description (answers "how" and "why")
 * @param {object|object[]} schema - JSON-LD schema object(s): Organization, Service, FAQPage, etc.
 * @param {string} canonicalUrl - Canonical URL for this page (e.g. https://operator.ink/Services)
 * @param {string} ogImage - Open Graph image URL (absolute or relative; defaults to logo)
 * @param {string} ogUrl - Open Graph URL (defaults to canonicalUrl)
 * @param {boolean} noIndex - If true, add robots noindex,nofollow (for private pages)
 */
export default function SEO({ title, description, schema, canonicalUrl, ogImage, ogUrl, noIndex }) {
  const schemas = Array.isArray(schema) ? schema : (schema ? [schema] : []);
  const imageUrl = ogImage ? (ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`) : DEFAULT_OG_IMAGE;
  const url = ogUrl ?? canonicalUrl ?? BASE_URL;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {title && <meta property="og:title" content={title} />}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </Helmet>
  );
}
