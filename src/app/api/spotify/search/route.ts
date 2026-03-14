import {NextRequest, NextResponse} from 'next/server'

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search'
const MAX_RESULTS = 10

let cachedToken: string | null = null
let tokenExpiresAt = 0

const getAccessToken = async (): Promise<string> => {
  const now = Date.now()

  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify credentials')
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch(TOKEN_ENDPOINT, {
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token')
  }

  const data = await response.json()
  const SAFETY_MARGIN_MS = 60_000

  cachedToken = data.access_token
  tokenExpiresAt = now + data.expires_in * 1000 - SAFETY_MARGIN_MS

  return cachedToken as string
}

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams.get('q')

  if (!query || query.trim().length === 0) {
    return NextResponse.json({tracks: []})
  }

  try {
    const token = await getAccessToken()

    const searchParams = new URLSearchParams({
      limit: String(MAX_RESULTS),
      market: 'CZ',
      q: query,
      type: 'track',
    })

    const response = await fetch(`${SEARCH_ENDPOINT}?${searchParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Spotify search failed')
    }

    const data = await response.json()

    const tracks = (data.tracks?.items ?? []).map((track: SpotifyTrack) => ({
      album: track.album.name,
      artist: track.artists.map((artist: SpotifyArtist) => artist.name).join(', '),
      externalUrl: track.external_urls.spotify,
      id: track.id,
      imageUrl: track.album.images[1]?.url ?? track.album.images[0]?.url ?? null,
      name: track.name,
      previewUrl: track.preview_url,
      spotifyUri: track.uri,
    }))

    return NextResponse.json({tracks})
  } catch {
    return NextResponse.json({error: 'Search failed'}, {status: 500})
  }
}

type SpotifyArtist = {
  name: string
}

type SpotifyTrack = {
  id: string
  name: string
  uri: string
  preview_url: string | null
  external_urls: {spotify: string}
  artists: SpotifyArtist[]
  album: {
    name: string
    images: {url: string; width: number; height: number}[]
  }
}
