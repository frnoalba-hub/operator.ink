import { useEffect } from 'react';

const DEFAULT_TITLE = 'Operator.ink — Web, GEO, AEO & SEO | AI Workflows & Demos';
const DEFAULT_DESCRIPTION = 'Operator.ink — Web design, GEO, AEO & SEO, AI workflows, and skilled nursing facility census tools. CensusBoard demo: non-PHI referral pipeline, bed tracking, admissions dashboard for SNFs.';

/**
 * Set page title and meta description for SEO/AEO.
 * Restores defaults on unmount.
 */
export function usePageSEO(title, description) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE;
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (description && metaDesc) metaDesc.setAttribute('content', description);
    if (title && ogTitle) ogTitle.setAttribute('content', title);
    if (description && ogDesc) ogDesc.setAttribute('content', description);

    return () => {
      document.title = DEFAULT_TITLE;
      if (metaDesc) metaDesc.setAttribute('content', DEFAULT_DESCRIPTION);
      if (ogTitle) ogTitle.setAttribute('content', DEFAULT_TITLE);
      if (ogDesc) ogDesc.setAttribute('content', DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
