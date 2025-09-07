import React from 'react';

const SITE_URL = 'https://www.enginuitystem.com';
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`;

function jsonLd(data) {
  return JSON.stringify(data);
}


export default function SEO({ title, description, path = '/', keywords = [], image }) {
  const cleanTitle = title ? `${title} — Enginuity STEM` : 'Enginuity STEM';
  const url = SITE_URL + path;
  const ogImage = image || DEFAULT_IMAGE;

  // include common search terms and owner name as fallback keywords
  const defaultKeywords = ['Enginuity', 'Enginuity STEM', 'Enginuity nonprofit', 'Anvay Ajmera', 'STEM education', 'student chapters'];
  const keywordList = Array.from(new Set([...defaultKeywords, ...keywords]));

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': SITE_URL + '#website',
        'url': SITE_URL,
        'name': 'Enginuity STEM',
        'description': 'Enginuity — student-led STEM chapters, projects, and open education resources.',
        'publisher': { '@id': SITE_URL + '#org' }
      },
      {
        '@type': 'Organization',
        '@id': SITE_URL + '#org',
        'name': 'Enginuity STEM',
        'url': SITE_URL,
        'logo': DEFAULT_IMAGE,
        'sameAs': []
      },
      {
        '@type': 'WebPage',
        '@id': url + '#webpage',
        'url': url,
        'name': cleanTitle,
        'description': description
      }
    ]
  };

  return (
    <>
      <title>{cleanTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordList.join(', ')} />

  <meta name="author" content="Anvay Ajmera" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={url} />

      {/* Open Graph */}

  <meta property="og:site_name" content="Enginuity STEM" />
  <meta property="og:title" content={cleanTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:locale" content="en_US" />

      {/* Twitter */}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={cleanTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:site" content="@enginuitystem" />
  <meta name="twitter:creator" content="@anvayajmera" />

      <script type="application/ld+json">{jsonLd(ld)}</script>
    </>
  );
}
