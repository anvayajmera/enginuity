export const GALLERY_USERNAME = 'enginuitystem_program';
export const GALLERY_PAGE_SIZE = 12;

const GALLERY_CACHE_KEY = 'enginuity.gallery.initial.v1';
const GALLERY_CACHE_TTL_MS = 10 * 60 * 1000;

const canUseSessionStorage = () => typeof window !== 'undefined' && Boolean(window.sessionStorage);

const normalizePagination = (pagination) => {
  const nextCursor = typeof pagination?.next_cursor === 'string' ? pagination.next_cursor : null;
  return {
    has_next_page: Boolean(pagination?.has_next_page && nextCursor),
    next_cursor: nextCursor,
  };
};

const normalizePayload = (payload) => {
  if (!payload || typeof payload !== 'object') return null;
  const posts = Array.isArray(payload.posts) ? payload.posts : [];
  return {
    configured: Boolean(payload.configured),
    profile: payload.profile || null,
    posts,
    pagination: normalizePagination(payload.pagination),
  };
};

export const buildGalleryFeedUrl = ({ cursor = null } = {}) => {
  const params = new URLSearchParams({
    username: GALLERY_USERNAME,
    limit: String(GALLERY_PAGE_SIZE),
  });
  if (cursor) params.set('cursor', cursor);
  return `/api/instagram-feed?${params.toString()}`;
};

export const toGalleryProxyUrl = (url) => (url ? `/api/instagram-media?url=${encodeURIComponent(url)}` : null);

export const readGalleryCache = () => {
  if (!canUseSessionStorage()) return null;
  try {
    const raw = window.sessionStorage.getItem(GALLERY_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || typeof parsed.cachedAt !== 'number') return null;

    if (Date.now() - parsed.cachedAt > GALLERY_CACHE_TTL_MS) {
      window.sessionStorage.removeItem(GALLERY_CACHE_KEY);
      return null;
    }

    return normalizePayload(parsed.payload);
  } catch {
    return null;
  }
};

export const writeGalleryCache = (payload) => {
  if (!canUseSessionStorage()) return;
  const normalizedPayload = normalizePayload(payload);
  if (!normalizedPayload) return;

  try {
    window.sessionStorage.setItem(
      GALLERY_CACHE_KEY,
      JSON.stringify({
        cachedAt: Date.now(),
        payload: normalizedPayload,
      }),
    );
  } catch {
    // Ignore storage quota and privacy mode failures.
  }
};

export const warmGalleryMedia = (posts = [], limit = 8) => {
  if (typeof Image === 'undefined') return;
  const subset = posts.slice(0, limit);
  subset.forEach((post) => {
    const source = post?.media_type === 'VIDEO'
      ? (post?.thumbnail_url || post?.media_url)
      : (post?.media_url || post?.thumbnail_url);
    const proxyUrl = toGalleryProxyUrl(source);
    if (!proxyUrl) return;
    const img = new Image();
    img.src = proxyUrl;
  });
};
