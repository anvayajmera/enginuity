const INSTAGRAM_MEDIA_HOST_PATTERNS = [
  /(^|\.)cdninstagram\.com$/i,
  /(^|\.)fbcdn\.net$/i,
  /(^|\.)fbsbx\.com$/i,
];

const isAllowedInstagramMediaHost = (hostname) =>
  INSTAGRAM_MEDIA_HOST_PATTERNS.some((pattern) => pattern.test(hostname));

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawUrl = req?.query?.url;
  if (typeof rawUrl !== 'string' || !rawUrl.trim()) {
    return res.status(400).json({ error: 'Missing required query param: url' });
  }

  let target;
  try {
    target = new URL(rawUrl);
  } catch {
    return res.status(400).json({ error: 'Invalid url query parameter' });
  }

  if (target.protocol !== 'https:') {
    return res.status(400).json({ error: 'Only https media URLs are allowed' });
  }

  if (!isAllowedInstagramMediaHost(target.hostname)) {
    return res.status(400).json({ error: 'Unsupported media host' });
  }

  try {
    const upstream = await fetch(target.toString(), {
      headers: {
        accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        referer: 'https://www.instagram.com/',
        'user-agent': 'Mozilla/5.0',
      },
    });

    if (!upstream.ok) {
      return res.status(502).json({ error: `Unable to fetch media (${upstream.status})` });
    }

    const body = new Uint8Array(await upstream.arrayBuffer());
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    const cacheControl = upstream.headers.get('cache-control') || 'public, s-maxage=86400, stale-while-revalidate=604800';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', cacheControl);
    return res.status(200).send(body);
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unexpected server error',
    });
  }
}
