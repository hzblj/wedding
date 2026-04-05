'use client'

import {useVirtualizer} from '@tanstack/react-virtual'
import Image from 'next/image'
import {type FC, useRef} from 'react'

import {useDictionary, plural} from '@/i18n'

import {type SongRequest, useSongRequests} from './hooks/use-song-requests'

const TABLE_IMAGE_SIZE = 36
const ROW_HEIGHT = 56
const SKELETON_ROWS = 6
const MAX_TABLE_HEIGHT = 480

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('cs-CZ', {day: 'numeric', month: 'short'})
}

type SongRowProps = {
  song: SongRequest
  index: number
}

const SongRow: FC<SongRowProps> = ({song, index}) => {
  return (
    <a
      href={song.external_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 px-4 border-b border-border/40 last:border-b-0 transition-colors duration-300 hover:bg-heading/5 group"
      style={{height: ROW_HEIGHT}}
    >
      <span className="text-body/30 text-[13px] w-6 text-right tabular-nums flex-shrink-0">{index + 1}</span>
      {song.image_url ? (
        <Image
          src={song.image_url}
          alt={song.album}
          width={TABLE_IMAGE_SIZE}
          height={TABLE_IMAGE_SIZE}
          className="rounded flex-shrink-0 object-cover"
        />
      ) : (
        <div
          className="rounded flex-shrink-0 bg-border/30"
          style={{height: TABLE_IMAGE_SIZE, width: TABLE_IMAGE_SIZE}}
        />
      )}
      <div className="flex flex-col gap-0 min-w-0 flex-1">
        <span className="text-heading text-[14px] leading-5 font-medium truncate group-hover:text-heading/80 transition-colors duration-300">{song.name}</span>
        <span className="text-body/50 text-[12px] leading-4 truncate">{song.artist}</span>
      </div>
      <span className="text-body/30 text-[12px] flex-shrink-0 hidden sm:block">{formatDate(song.created_at)}</span>
    </a>
  )
}

const SkeletonRow: FC = () => {
  return (
    <div className="flex items-center gap-4 px-4 border-b border-border/40" style={{height: ROW_HEIGHT}}>
      <div className="w-6 h-3 bg-border/40 rounded animate-pulse" />
      <div
        className="rounded bg-border/40 flex-shrink-0 animate-pulse"
        style={{height: TABLE_IMAGE_SIZE, width: TABLE_IMAGE_SIZE}}
      />
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <div className="h-3.5 bg-border/40 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-border/30 rounded animate-pulse w-1/2" />
      </div>
    </div>
  )
}

const TableSkeleton: FC = () => {
  return (
    <div className="flex flex-col w-full">
      {Array.from({length: SKELETON_ROWS}, (_, index) => (
        <SkeletonRow key={index} />
      ))}
    </div>
  )
}

const VirtualizedList: FC<{songs: SongRequest[]}> = ({songs}) => {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: songs.length,
    estimateSize: () => ROW_HEIGHT,
    getScrollElement: () => parentRef.current,
    overscan: 10,
  })

  return (
    <div ref={parentRef} className="overflow-y-auto" style={{maxHeight: MAX_TABLE_HEIGHT}}>
      <div className="relative w-full" style={{height: `${virtualizer.getTotalSize()}px`}}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={songs[virtualRow.index].id}
            className="absolute top-0 left-0 w-full"
            style={{
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <SongRow song={songs[virtualRow.index]} index={virtualRow.index} />
          </div>
        ))}
      </div>
    </div>
  )
}

export const SongRequestsTable: FC = () => {
  const {data: songs, isLoading} = useSongRequests()
  const {dictionary} = useDictionary()

  if (isLoading) {
    return (
      <div className="flex flex-col w-full max-w-2xl mx-auto">
        <div className="flex items-center px-4 py-3 border-b border-border">
          <span className="text-body/40 text-[13px] uppercase tracking-wide font-medium">{dictionary.songRequests.title}</span>
          <span className="text-body/20 text-[13px] ml-auto">{dictionary.songRequests.loading}</span>
        </div>
        <TableSkeleton />
      </div>
    )
  }

  if (!songs || songs.length === 0) {
    return null
  }

  const songsPlural = dictionary.songRequests.songs

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto bg-white/40 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
      <div className="flex items-center px-4 py-3 border-b border-border">
        <span className="text-body/40 text-[13px] uppercase tracking-wide font-medium">{dictionary.songRequests.title}</span>
        <span className="text-body/20 text-[13px] ml-auto tabular-nums">
          {songs.length} {plural(songs.length, songsPlural.one, songsPlural.few, songsPlural.many)}
        </span>
      </div>
      <VirtualizedList songs={songs} />
    </div>
  )
}
