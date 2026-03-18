import { Helmet } from 'react-helmet-async';

/**
 * SEO component for GEO (Generative Engine Optimization).
 * Manages document head and injects JSON-LD schema for AI model recognition.
 *
 * @param {string} title - Page title (natural, conversational)
 * @param {string} description - Meta description (answers "how" and "why")
 * @param {object|object[]} schema - JSON-LD schema object(s): Organization, Service, FAQPage, etc.
 */
export default function SEO({ title, description, schema }) {
  const schemas = Array.isArray(schema) ? schema : (schema ? [schema] : []);

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {title && <meta property="og:title" content={title} />}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
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
