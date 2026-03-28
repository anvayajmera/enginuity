import { useEffect, useMemo, useRef, useState } from 'react';
import {
  GALLERY_USERNAME,
  buildGalleryFeedUrl,
  readGalleryCache,
  toGalleryProxyUrl,
  warmGalleryMedia,
  writeGalleryCache,
} from '../utils/galleryCache';
import './InstagramFeed.css';

const SYNTHETIC_DATE_STEP_DAYS = 21;

const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
};

const toDayKey = (isoString) => {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return null;
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
};

const shouldUseSyntheticTimeline = (items) => {
  const keys = items.map((post) => toDayKey(post?.timestamp)).filter(Boolean);
  if (keys.length <= 1) return true;
  const counts = new Map();
  keys.forEach((key) => counts.set(key, (counts.get(key) || 0) + 1));
  const maxBucket = Math.max(...counts.values());
  return maxBucket / keys.length >= 0.7;
};

const buildDisplayDateMap = (items) => {
  const map = new Map();
  if (!Array.isArray(items) || items.length === 0) return map;

  const useSynthetic = shouldUseSyntheticTimeline(items);
  if (!useSynthetic) {
    items.forEach((post) => {
      if (post?.id) map.set(post.id, formatDate(post.timestamp));
    });
    return map;
  }

  const firstValidTimestamp = items.find((post) => !Number.isNaN(new Date(post?.timestamp).getTime()))?.timestamp || null;
  const baseDate = firstValidTimestamp ? new Date(firstValidTimestamp) : new Date();

  items.forEach((post, index) => {
    if (!post?.id) return;
    const synthetic = new Date(baseDate);
    synthetic.setDate(synthetic.getDate() - (index * SYNTHETIC_DATE_STEP_DAYS));
    map.set(post.id, new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(synthetic));
  });

  return map;
};

const truncate = (text, limit = 120) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}...`;
};

const dedupeById = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

const InstagramFeed = () => {
  const initialCacheRef = useRef(readGalleryCache());
  const initialCache = initialCacheRef.current;
  const cachedPosts = Array.isArray(initialCache?.posts) ? dedupeById(initialCache.posts) : [];
  const cachedPagination = initialCache?.pagination || {};

  const [posts, setPosts] = useState(cachedPosts);
  const [isLoadingInitial, setIsLoadingInitial] = useState(cachedPosts.length === 0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isConfigured, setIsConfigured] = useState(Boolean(initialCache?.configured));
  const [profile, setProfile] = useState(initialCache?.profile || null);
  const [nextCursor, setNextCursor] = useState(
    typeof cachedPagination.next_cursor === 'string' ? cachedPagination.next_cursor : null,
  );
  const [hasNextPage, setHasNextPage] = useState(
    Boolean(cachedPagination.has_next_page && cachedPagination.next_cursor),
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const hasWarmCache = cachedPosts.length > 0;

    const loadPage = async (cursor = null, { silent = false } = {}) => {
      if (!mounted) return;
      if (cursor) setIsLoadingMore(true);
      else if (!silent) setIsLoadingInitial(true);

      try {
        const response = await fetch(buildGalleryFeedUrl({ cursor }));
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.error || 'Unable to load Instagram posts');
        }
        if (!mounted) return;

        const incomingPosts = Array.isArray(payload.posts) ? payload.posts : [];
        setPosts((prev) => dedupeById(cursor ? [...prev, ...incomingPosts] : incomingPosts));
        setIsConfigured(Boolean(payload.configured));
        setProfile((prev) => payload.profile || prev);

        const pagination = payload?.pagination || {};
        const cursorValue = typeof pagination.next_cursor === 'string' ? pagination.next_cursor : null;
        const canLoadMore = Boolean(pagination.has_next_page && cursorValue);
        setHasNextPage(canLoadMore);
        setNextCursor(cursorValue);
        setError(null);

        if (!cursor) {
          writeGalleryCache({
            configured: Boolean(payload.configured),
            profile: payload.profile || null,
            posts: incomingPosts,
            pagination,
          });
          warmGalleryMedia(incomingPosts);
        }
      } catch (err) {
        if (!mounted) return;
        if (!cursor) {
          setPosts([]);
          setIsConfigured(false);
          setProfile(null);
        }
        setHasNextPage(false);
        setNextCursor(null);
        setError(err instanceof Error ? err.message : 'Unable to load gallery');
      } finally {
        if (mounted) {
          if (cursor) setIsLoadingMore(false);
          else if (!silent) setIsLoadingInitial(false);
        }
      }
    };

    loadPage(null, { silent: hasWarmCache });
    return () => {
      mounted = false;
    };
  }, [cachedPosts.length]);

  const handleLoadMore = async () => {
    if (!nextCursor || isLoadingInitial || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const response = await fetch(buildGalleryFeedUrl({ cursor: nextCursor }));
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || 'Unable to load older posts');
      }

      const incomingPosts = Array.isArray(payload.posts) ? payload.posts : [];
      setPosts((prev) => dedupeById([...prev, ...incomingPosts]));
      const pagination = payload?.pagination || {};
      const cursorValue = typeof pagination.next_cursor === 'string' ? pagination.next_cursor : null;
      const canLoadMore = Boolean(pagination.has_next_page && cursorValue);
      setHasNextPage(canLoadMore);
      setNextCursor(cursorValue);
    } catch (err) {
      setHasNextPage(false);
      setNextCursor(null);
      setError(err instanceof Error ? err.message : 'Unable to load older posts');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasPosts = useMemo(() => posts.length > 0, [posts]);
  const totalPosts = profile?.post_count || null;
  const totalLikes = useMemo(
    () => posts.reduce((sum, post) => sum + (Number(post?.like_count) || 0), 0),
    [posts],
  );
  const followerCount = typeof profile?.followers === 'number' ? profile.followers : null;
  const displayDateMap = useMemo(() => buildDisplayDateMap(posts), [posts]);

  return (
    <section id="gallery" className="gallery-section section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Gallery</div>
          <h2 className="section-title">Enginuity in Action</h2>
          <p className="section-description">
            A live timeline from @{GALLERY_USERNAME} featuring kit builds, CAD and PCB modules, UN participation, and global partner deployments.
          </p>
        </div>

        <div className="gallery-intro-panel">
          <div className="gallery-profile-card">
            <div className="gallery-profile-metric">
              <strong>{followerCount !== null ? followerCount.toLocaleString() : '—'}</strong>
              <span>Followers</span>
            </div>
            <div className="gallery-profile-metric">
              <strong>{(totalPosts || posts.length).toLocaleString()}</strong>
              <span>Total Posts</span>
            </div>
            <div className="gallery-profile-metric">
              <strong>{totalLikes.toLocaleString()}</strong>
              <span>Total Likes</span>
            </div>
            <div className="gallery-profile-metric">
              <strong>{posts.length.toLocaleString()}</strong>
              <span>
                {totalPosts ? `Loaded of ${totalPosts.toLocaleString()}` : 'Posts Loaded'}
              </span>
            </div>
            <p>{profile?.biography || 'Live Instagram stats update as posts sync into the gallery.'}</p>
          </div>
          <a
            href="https://www.instagram.com/enginuitystem_program/"
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Instagram
          </a>
        </div>

        {isLoadingInitial && (
          <div className="gallery-state-card">
            <p>Loading gallery...</p>
          </div>
        )}

        {!isLoadingInitial && !hasPosts && (
          <div className="gallery-state-card">
            <p>
              {error
                ? error
                : (isConfigured
                  ? 'No gallery posts were returned right now.'
                  : 'Gallery is ready but Instagram data was not available for this request.')}
            </p>
          </div>
        )}

        {!isLoadingInitial && hasPosts && (
          <>
            <div className="gallery-grid">
              {posts.map((post, index) => {
                const sourceUrl = post.media_type === 'VIDEO'
                  ? (post.media_url || post.thumbnail_url)
                  : (post.media_url || post.thumbnail_url);
                const proxyUrl = toGalleryProxyUrl(sourceUrl);
                const imageUrl = proxyUrl || sourceUrl;
                const cardClass =
                  index === 0
                    ? 'gallery-card gallery-card-feature'
                    : (index % 7 === 0
                      ? 'gallery-card gallery-card-wide'
                      : (index % 5 === 0 ? 'gallery-card gallery-card-tall' : 'gallery-card'));

                if (!imageUrl) return null;
                return (
                  <article key={post.id} className={cardClass}>
                    <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="gallery-media-link">
                      <img
                        src={imageUrl}
                        alt={truncate(post.caption, 80) || 'Instagram post'}
                        className="gallery-media"
                        loading={index < 8 ? 'eager' : 'lazy'}
                        fetchPriority={index < 3 ? 'high' : 'auto'}
                        onError={(event) => {
                          if (!sourceUrl) return;
                          if (event.currentTarget.src === sourceUrl) return;
                          event.currentTarget.src = sourceUrl;
                        }}
                      />
                      <div className="gallery-overlay">
                        <div className="gallery-overlay-top">
                          <span className="gallery-type">{post.media_type === 'VIDEO' ? 'Video' : 'Post'}</span>
                          <span className="gallery-date">{displayDateMap.get(post.id) || formatDate(post.timestamp)}</span>
                        </div>
                        <p>{truncate(post.caption, 145) || 'View this post on Instagram.'}</p>
                      </div>
                    </a>
                  </article>
                );
              })}
            </div>

            <div className="gallery-controls">
              {error && <p className="gallery-error">{error}</p>}
              {hasNextPage && (
                <button type="button" className="btn btn-primary" onClick={handleLoadMore} disabled={isLoadingMore}>
                  {isLoadingMore ? 'Loading older posts...' : 'Load older posts'}
                </button>
              )}
              {!hasNextPage && <p className="gallery-end">Reached the beginning of the gallery.</p>}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default InstagramFeed;
