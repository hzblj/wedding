import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useCallback} from 'react'
import {toast} from 'sonner'

import {createClient} from '@/lib'

import type {SpotifyTrackResult} from './use-spotify-search'

export type SongRequest = {
  id: string
  name: string
  artist: string
  album: string
  image_url: string | null
  spotify_uri: string
  external_url: string
  created_at: string
}

const SONG_REQUESTS_KEY = ['song-requests'] as const

const fetchSongRequests = async (): Promise<SongRequest[]> => {
  const supabase = createClient()

  const {data, error} = await supabase.from('song_requests').select('*').order('created_at', {ascending: false})

  if (error) {
    throw error
  }

  return data ?? []
}

export const useSongRequests = () => {
  return useQuery({
    queryFn: fetchSongRequests,
    queryKey: SONG_REQUESTS_KEY,
  })
}

export const useSaveSongMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (track: SpotifyTrackResult) => {
      const supabase = createClient()

      const {data, error} = await supabase
        .from('song_requests')
        .insert({
          album: track.album,
          artist: track.artist,
          external_url: track.externalUrl,
          image_url: track.imageUrl,
          name: track.name,
          spotify_uri: track.spotifyUri,
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      return data as SongRequest
    },
    onError: () => {
      toast.error('Něco se pokazilo, zkus to znovu')
    },
    onSuccess: newSong => {
      queryClient.setQueryData<SongRequest[]>(SONG_REQUESTS_KEY, previous => {
        if (!previous) {
          return [newSong]
        }
        return [newSong, ...previous]
      })
    },
  })

  const saveSong = useCallback(
    (track: SpotifyTrackResult) => {
      mutation.mutate(track)
    },
    [mutation.mutate]
  )

  const isSongAlreadyAdded = useCallback(
    (spotifyUri: string) => {
      const songs = queryClient.getQueryData<SongRequest[]>(SONG_REQUESTS_KEY)
      if (!songs) {
        return false
      }
      return songs.some(song => song.spotify_uri === spotifyUri)
    },
    [queryClient]
  )

  return {
    isPending: mutation.isPending,
    isSongAlreadyAdded,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
    saveSong,
  }
}
