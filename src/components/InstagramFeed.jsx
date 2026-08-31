import { useEffect, useMemo, useRef, useState } from 'react';
import {
  buildGalleryFeedUrl,
  readGalleryCache,
  toGalleryProxyUrl,
  warmGalleryMedia,
  writeGalleryCache,
} from '../utils/galleryCache';
import './InstagramFeed.css';
import suppliesImg from '../../supplies.png';
import bluetoothKitImg from '../../images/bluetooth kit.png';
import kitsImg from '../../images/kit.png';
import zambiaSuccessImg from '../../zambiasuccess.png';
import anvaySpeakingImg from '../../images/anvayspeakingun.JPG';
import hlpfImg from '../../images/hlpfun.JPG';
import siblingsClassroomImg from '../../images/siblingskeeper/classroom-1.jpeg';
import siblingsCommunityImg from '../../images/siblingskeeper/community-1.jpeg';
import apexSpaceImg from '../../images/apexspace.jpg';

const GALLERY_HIGHLIGHTS = [
  { id: 'highlight-kits', caption: 'Custom engineering modules prepared for hands-on classroom learning.', media_type: 'IMAGE', media_url: suppliesImg, permalink: '/impact', is_local: true },
  { id: 'highlight-bluetooth', caption: 'Students explore circuitry through complete Bluetooth kit assemblies.', media_type: 'IMAGE', media_url: bluetoothKitImg, permalink: '/impact', is_local: true },
  { id: 'highlight-module', caption: 'Build-first engineering turns designs into complete products.', media_type: 'IMAGE', media_url: kitsImg, permalink: '/impact', is_local: true },
  { id: 'highlight-zambia', caption: 'Engineering access reaches partner classrooms in Zambia and beyond.', media_type: 'IMAGE', media_url: zambiaSuccessImg, permalink: '/impact', is_local: true },
  { id: 'highlight-un-speech', caption: 'Youth-led engineering advocacy at United Nations forums.', media_type: 'IMAGE', media_url: anvaySpeakingImg, permalink: '/united-nations', is_local: true },
  { id: 'highlight-hlpf', caption: 'Enginuity representatives connect youth ideas with global action.', media_type: 'IMAGE', media_url: hlpfImg, permalink: '/united-nations', is_local: true },
  { id: 'highlight-classroom', caption: 'Students learn through daily classroom support at Dominion School.', media_type: 'IMAGE', media_url: siblingsClassroomImg, permalink: '/siblings-keeper', is_local: true },
  { id: 'highlight-community', caption: 'Siblings Keeper programs support children, families, and communities.', media_type: 'IMAGE', media_url: siblingsCommunityImg, permalink: '/siblings-keeper', is_local: true },
  { id: 'highlight-apex', caption: 'Student engineering projects connect design, testing, and deployment.', media_type: 'IMAGE', media_url: apexSpaceImg, permalink: '/impact', is_local: true },
];

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
  const initialPosts = cachedPosts.length > 0 ? cachedPosts : GALLERY_HIGHLIGHTS;

  const [posts, setPosts] = useState(initialPosts);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isConfigured, setIsConfigured] = useState(Boolean(initialCache?.configured));
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
          throw new Error(payload?.error || 'Unable to load gallery images');
        }
        if (!mounted) return;

        const incomingPosts = Array.isArray(payload.posts) ? payload.posts : [];
        setPosts((prev) => dedupeById(cursor
          ? [...prev, ...incomingPosts]
          : (incomingPosts.length > 0 ? incomingPosts : GALLERY_HIGHLIGHTS)));
        setIsConfigured(Boolean(payload.configured));

        const pagination = payload?.pagination || {};
        const cursorValue = typeof pagination.next_cursor === 'string' ? pagination.next_cursor : null;
        const canLoadMore = Boolean(pagination.has_next_page && cursorValue);
        setHasNextPage(canLoadMore);
        setNextCursor(cursorValue);
        setError(null);

        if (!cursor && incomingPosts.length > 0) {
          writeGalleryCache({
            configured: Boolean(payload.configured),
            profile: payload.profile || null,
            posts: incomingPosts,
            pagination,
          });
          warmGalleryMedia(incomingPosts);
        }
      } catch {
        if (!mounted) return;
        if (!cursor) {
          setPosts((prev) => (prev.length > 0 ? prev : GALLERY_HIGHLIGHTS));
          setIsConfigured(false);
        }
        setHasNextPage(false);
        setNextCursor(null);
        setError(cursor ? 'Unable to load older gallery images right now.' : null);
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
        throw new Error(payload?.error || 'Unable to load older gallery images');
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
      setError(err instanceof Error ? err.message : 'Unable to load older gallery images');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasPosts = useMemo(() => posts.length > 0, [posts]);
  const displayDateMap = useMemo(() => buildDisplayDateMap(posts), [posts]);

  return (
    <section id="gallery" className="gallery-section section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Gallery</div>
          <h1 className="section-title">Enginuity in Action</h1>
          <p className="section-description">
            Explore highlights from kit builds, CAD and PCB modules, UN participation, and global partner deployments.
          </p>
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
                  : 'Gallery images are not available for this request right now.')}
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
                const proxyUrl = post.is_local ? null : toGalleryProxyUrl(sourceUrl);
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
                    <a
                      href={post.permalink}
                      target={post.is_local ? undefined : '_blank'}
                      rel={post.is_local ? undefined : 'noopener noreferrer'}
                      className="gallery-media-link"
                    >
                      <img
                        src={imageUrl}
                        alt={truncate(post.caption, 80) || 'Enginuity gallery image'}
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
                          {!post.is_local && (
                            <span className="gallery-date">{displayDateMap.get(post.id) || formatDate(post.timestamp)}</span>
                          )}
                        </div>
                        <p>{truncate(post.caption, 145) || 'View this Enginuity gallery highlight.'}</p>
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
