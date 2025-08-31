import React from 'react';

const SITE_URL = 'https://www.enginuitystem.com';
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`;

function jsonLd(data) {
  return JSON.stringify(data);
}

export default function SEO({ title, description, path = '/', keywords = [] }) {
  const url = SITE_URL + path;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'url': url,
    'name': title,
    'description': description,
    'publisher': {
      '@type': 'Organization',
      'name': 'Enginuity STEM',
      'url': SITE_URL,
      'logo': DEFAULT_IMAGE
    }
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      <script type="application/ld+json">{jsonLd(ld)}</script>
    </>
  );
}
