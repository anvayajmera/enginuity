import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const DEFAULT_USERNAME = 'enginuitystem_program'
const DEFAULT_LIMIT = 12
const MAX_LIMIT = 24
const INSTAGRAM_MEDIA_HOST_PATTERNS = [
  /(^|\.)cdninstagram\.com$/i,
  /(^|\.)fbcdn\.net$/i,
  /(^|\.)fbsbx\.com$/i,
]

const isAllowedInstagramMediaHost = (hostname) =>
  INSTAGRAM_MEDIA_HOST_PATTERNS.some((pattern) => pattern.test(hostname))

const writeJson = (res, statusCode, payload) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

const parseLimit = (rawLimit) => {
  const parsed = Number.parseInt(String(rawLimit || ''), 10)
  if (Number.isNaN(parsed) || parsed <= 0) return DEFAULT_LIMIT
  return Math.min(parsed, MAX_LIMIT)
}

const parseCountFromText = (text, label) => {
  const regex = new RegExp(`([\\d.,]+)\\s+${label}`, 'i')
  const matched = text.match(regex)?.[1]
  if (!matched) return null
  const digitsOnly = matched.replace(/[^\d]/g, '')
  const parsed = Number.parseInt(digitsOnly, 10)
  return Number.isNaN(parsed) ? null : parsed
}

const instagramHeaders = (username) => ({
  'x-ig-app-id': '936619743392459',
  'user-agent': 'Mozilla/5.0',
  accept: '*/*',
  referer: `https://www.instagram.com/${username}/`,
  'sec-fetch-site': 'same-origin',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
})

const pickFromCandidates = (candidates = [], index = 0) => {
  if (!Array.isArray(candidates) || candidates.length === 0) return null
  if (index < 0) return candidates[candidates.length - 1]?.url || null
  return candidates[index]?.url || candidates[0]?.url || null
}

const getPrimaryMediaNode = (item) =>
  (item?.media_type === 8 && Array.isArray(item?.carousel_media) ? item.carousel_media[0] : item) || item

const toPostFromFeedItem = (item) => {
  const primary = getPrimaryMediaNode(item)
  const candidates = primary?.image_versions2?.candidates || []
  const mediaUrl = pickFromCandidates(candidates, 0)
  const thumbnailUrl = pickFromCandidates(candidates, 0) || mediaUrl

  let mediaType = 'IMAGE'
  if (item?.media_type === 2) mediaType = 'VIDEO'
  if (item?.media_type === 8) mediaType = 'CAROUSEL_ALBUM'

  return {
    id: String(item?.id || item?.pk || ''),
    caption: item?.caption?.text || '',
    media_type: mediaType,
    media_url: mediaUrl,
    thumbnail_url: thumbnailUrl,
    like_count: Number(item?.like_count) || 0,
    permalink: item?.code ? `https://www.instagram.com/p/${item.code}/` : null,
    timestamp: item?.taken_at ? new Date(item.taken_at * 1000).toISOString() : null,
  }
}

const fetchProfileFromHtml = async (username) => {
  const url = `https://www.instagram.com/${encodeURIComponent(username)}/`
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0',
      accept: 'text/html',
      referer: url,
    },
  })

  if (!response.ok) return null
  const html = await response.text()

  const description = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i)?.[1] || ''
  const title = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i)?.[1] || ''
  const nameFromTitle = title.split('(')[0]?.trim() || username

  const followers = parseCountFromText(description, 'Followers')
  const following = parseCountFromText(description, 'Following')
  const postCount = parseCountFromText(description, 'Posts')

  return {
    username,
    full_name: nameFromTitle || username,
    biography: '',
    followers: followers ?? 0,
    following: following ?? 0,
    post_count: postCount ?? 0,
    profile_pic_url: null,
    profile_url: `https://www.instagram.com/${username}/`,
  }
}

const fetchProfile = async (username) => {
  try {
    const profileEndpoint = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`
    const response = await fetch(profileEndpoint, { headers: instagramHeaders(username) })
    const payload = await response.json()

    if (response.ok && payload?.data?.user) {
      const user = payload.data.user
      return {
        username,
        full_name: user.full_name || username,
        biography: user.biography || '',
        followers: user?.edge_followed_by?.count || 0,
        following: user?.edge_follow?.count || 0,
        post_count: user?.edge_owner_to_timeline_media?.count || 0,
        profile_pic_url: user?.profile_pic_url_hd || user?.profile_pic_url || null,
        profile_url: `https://www.instagram.com/${username}/`,
      }
    }
  } catch {
    // fall through to HTML parsing fallback
  }

  return fetchProfileFromHtml(username)
}

const instagramDevApi = () => ({
  name: 'instagram-dev-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url) return next()

      const requestUrl = new URL(req.url, 'http://localhost')

      if (requestUrl.pathname === '/api/instagram-feed') {
        if (req.method !== 'GET') {
          res.setHeader('Allow', 'GET')
          writeJson(res, 405, { error: 'Method not allowed' })
          return
        }

        const rawUsername = requestUrl.searchParams.get('username')
        const username = rawUsername && rawUsername.trim()
          ? rawUsername.trim().toLowerCase()
          : DEFAULT_USERNAME
        const rawCursor = requestUrl.searchParams.get('cursor')
        const cursor = rawCursor && rawCursor.trim() ? rawCursor.trim() : null
        const limit = parseLimit(requestUrl.searchParams.get('limit'))

        try {
          const feedUrl = new URL(`https://www.instagram.com/api/v1/feed/user/${encodeURIComponent(username)}/username/`)
          feedUrl.searchParams.set('count', String(limit))
          if (cursor) feedUrl.searchParams.set('max_id', cursor)

          const feedResponse = await fetch(feedUrl.toString(), { headers: instagramHeaders(username) })
          const feedPayload = await feedResponse.json()

          if (!feedResponse.ok || !Array.isArray(feedPayload?.items)) {
            writeJson(res, 502, {
              configured: false,
              username,
              profile: null,
              posts: [],
              pagination: { has_next_page: false, next_cursor: null },
              error: feedPayload?.message || 'Unable to load Instagram feed data',
            })
            return
          }

          const posts = feedPayload.items
            .map(toPostFromFeedItem)
            .filter((post) => post.id && post.media_url && post.permalink)

          const profile = cursor ? null : await fetchProfile(username)
          const pagination = {
            has_next_page: Boolean(feedPayload?.more_available && feedPayload?.next_max_id),
            next_cursor: feedPayload?.next_max_id || null,
          }

          writeJson(res, 200, { configured: true, username, profile, posts, pagination })
        } catch (error) {
          writeJson(res, 500, {
            configured: false,
            username,
            profile: null,
            posts: [],
            pagination: { has_next_page: false, next_cursor: null },
            error: error instanceof Error ? error.message : 'Unexpected server error',
          })
        }
        return
      }

      if (requestUrl.pathname === '/api/instagram-media') {
        if (req.method !== 'GET') {
          res.setHeader('Allow', 'GET')
          writeJson(res, 405, { error: 'Method not allowed' })
          return
        }

        const rawUrl = requestUrl.searchParams.get('url')
        if (!rawUrl || !rawUrl.trim()) {
          writeJson(res, 400, { error: 'Missing required query param: url' })
          return
        }

        let target
        try {
          target = new URL(rawUrl)
        } catch {
          writeJson(res, 400, { error: 'Invalid url query parameter' })
          return
        }

        if (target.protocol !== 'https:') {
          writeJson(res, 400, { error: 'Only https media URLs are allowed' })
          return
        }

        if (!isAllowedInstagramMediaHost(target.hostname)) {
          writeJson(res, 400, { error: 'Unsupported media host' })
          return
        }

        try {
          const upstream = await fetch(target.toString(), {
            headers: {
              accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
              referer: 'https://www.instagram.com/',
              'user-agent': 'Mozilla/5.0',
            },
          })

          if (!upstream.ok) {
            writeJson(res, 502, { error: `Unable to fetch media (${upstream.status})` })
            return
          }

          const body = new Uint8Array(await upstream.arrayBuffer())
          const contentType = upstream.headers.get('content-type') || 'application/octet-stream'
          const cacheControl = upstream.headers.get('cache-control') || 'public, max-age=86400, stale-while-revalidate=604800'

          res.statusCode = 200
          res.setHeader('Content-Type', contentType)
          res.setHeader('Cache-Control', cacheControl)
          res.end(body)
        } catch (error) {
          writeJson(res, 500, {
            error: error instanceof Error ? error.message : 'Unexpected server error',
          })
        }
        return
      }

      return next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), instagramDevApi()],
})
