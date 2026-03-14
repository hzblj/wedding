'use client'

import Image from 'next/image'
import {type ChangeEvent, type FC, type KeyboardEvent, useCallback, useEffect, useRef, useState} from 'react'

import {cn} from '@/utils'

import {useSaveSongMutation} from './hooks/use-song-requests'
import {type SpotifyTrackResult, useSpotifySearch} from './hooks/use-spotify-search'

const ALBUM_ART_SIZE = 48

type TrackItemProps = {
  track: SpotifyTrackResult
  onSelect: (track: SpotifyTrackResult) => void
  isHighlighted: boolean
}

const TrackItem: FC<TrackItemProps> = ({track, onSelect, isHighlighted}) => {
  const handleClick = useCallback(() => {
    onSelect(track)
  }, [track, onSelect])

  return (
    <button
      type="button"
      className={cn(
        'flex items-center gap-4 p-3 rounded-xl transition-colors duration-300 hover:bg-heading/5 group cursor-pointer text-left w-full',
        isHighlighted && 'bg-heading/5'
      )}
      onClick={handleClick}
    >
      {track.imageUrl ? (
        <Image
          src={track.imageUrl}
          alt={track.album}
          width={ALBUM_ART_SIZE}
          height={ALBUM_ART_SIZE}
          className="rounded-lg flex-shrink-0 object-cover"
        />
      ) : (
        <div
          className="rounded-lg flex-shrink-0 bg-border/50 flex items-center justify-center"
          style={{height: ALBUM_ART_SIZE, width: ALBUM_ART_SIZE}}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-body/30">
            <path
              d="M9 18V5l12-2v13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
            <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      )}
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="text-heading text-[15px] leading-5 font-medium truncate group-hover:text-heading/80 transition-colors duration-300">
          {track.name}
        </span>
        <span className="text-body/60 text-[13px] leading-4 truncate">{track.artist}</span>
      </div>
    </button>
  )
}

const SearchIcon: FC = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-body/40 flex-shrink-0">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const LoadingSpinner: FC = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="animate-spin text-body/40 flex-shrink-0">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const ClearIcon: FC = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-body/40">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const CheckIcon: FC = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-heading">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const SongSearch: FC = () => {
  const {query, setQuery, results, isLoading, selectedTrack, selectTrack, clearSelection} = useSpotifySearch()
  const {saveSong, isPending, isSuccess, reset, isSongAlreadyAdded} = useSaveSongMutation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [results])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    [setQuery]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (results.length === 0) return

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setHighlightedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0))
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1))
      } else if (event.key === 'Enter' && highlightedIndex >= 0) {
        event.preventDefault()
        selectTrack(results[highlightedIndex])
      }
    },
    [results, highlightedIndex, selectTrack]
  )

  const handleClear = useCallback(() => {
    clearSelection()
    reset()
    inputRef.current?.focus()
  }, [clearSelection, reset])

  const handleSave = useCallback(() => {
    if (!selectedTrack) {
      return
    }
    saveSong(selectedTrack)
  }, [selectedTrack, saveSong])

  const hasResults = results.length > 0
  const hasQuery = query.trim().length > 0
  const isEmptyState = hasQuery && !isLoading && !hasResults && !selectedTrack
  const isAlreadyAdded = selectedTrack ? isSongAlreadyAdded(selectedTrack.spotifyUri) : false

  return (
    <div className="flex flex-col gap-0 w-full max-w-lg mx-auto">
      <div className="flex items-start gap-3">
        <div className="flex flex-col flex-1 min-w-0">
          <div
            className={cn(
              'flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-border px-4 py-3 transition-all duration-300 focus-within:border-heading/30 focus-within:bg-white/80',
              hasResults ? 'rounded-t-xl rounded-b-none border-b-0' : 'rounded-xl'
            )}
          >
            {isLoading ? <LoadingSpinner /> : <SearchIcon />}
            {selectedTrack ? (
              <span className="flex-1 text-heading text-[16px] leading-6 font-medium truncate">
                {selectedTrack.name} — {selectedTrack.artist}
              </span>
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Hledej písničku..."
                className="flex-1 bg-transparent text-heading text-[16px] leading-6 placeholder:text-body/30 outline-none"
              />
            )}
            {selectedTrack && (
              <button
                type="button"
                onClick={handleClear}
                className="flex-shrink-0 p-1 rounded-full hover:bg-heading/10 transition-colors duration-300 cursor-pointer"
              >
                <ClearIcon />
              </button>
            )}
          </div>
          {hasResults && (
            <div className="flex flex-col bg-white/60 backdrop-blur-sm border border-border border-t-0 rounded-b-xl overflow-hidden">
              <div className="h-px w-full bg-border/50 mx-4" />
              <div className="flex flex-col p-1 max-h-96 overflow-y-auto">
                {results.map((track, index) => (
                  <TrackItem
                    key={track.id}
                    track={track}
                    onSelect={selectTrack}
                    isHighlighted={index === highlightedIndex}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {!isSuccess && (
          <button
            type="button"
            onClick={handleSave}
            disabled={!selectedTrack || isPending || isAlreadyAdded}
            className={cn(
              'flex-shrink-0 inline-flex items-center justify-center uppercase text-[14px] font-medium text-white px-5 py-3 rounded-full transition-all duration-300 ease-in-out',
              !selectedTrack || isPending || isAlreadyAdded
                ? 'bg-heading/30 cursor-not-allowed'
                : 'bg-heading hover:bg-heading/80 cursor-pointer'
            )}
          >
            {isPending ? <LoadingSpinner /> : isAlreadyAdded ? 'Přidáno' : 'Přidat'}
          </button>
        )}
        {isSuccess && (
          <button
            type="button"
            onClick={handleClear}
            className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 uppercase text-[14px] font-medium text-heading px-4 py-3 rounded-full border border-border hover:bg-heading/5 transition-all duration-300 cursor-pointer"
          >
            <CheckIcon />
            Další
          </button>
        )}
      </div>
    </div>
  )
}
