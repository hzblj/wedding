import {useCallback, useEffect, useRef, useState} from 'react'

export type SpotifyTrackResult = {
  id: string
  name: string
  artist: string
  album: string
  imageUrl: string | null
  spotifyUri: string
  previewUrl: string | null
  externalUrl: string
}

const DEBOUNCE_DELAY = 350

export const useSpotifySearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SpotifyTrackResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const searchTracks = useCallback(async (searchQuery: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    if (searchQuery.trim().length === 0) {
      setResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const params = new URLSearchParams({q: searchQuery})
      const response = await fetch(`/api/spotify/search?${params}`, {
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setResults(data.tracks)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }
      setResults([])
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      searchTracks(query)
    }, DEBOUNCE_DELAY)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [query, searchTracks])

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrackResult | null>(null)

  const selectTrack = useCallback((track: SpotifyTrackResult) => {
    setSelectedTrack(track)
    setQuery(`${track.name} — ${track.artist}`)
    setResults([])
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedTrack(null)
    setQuery('')
    setResults([])
  }, [])

  return {clearSelection, isLoading, query, results, selectedTrack, selectTrack, setQuery}
}
