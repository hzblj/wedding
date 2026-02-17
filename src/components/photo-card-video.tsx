'use client'

import Image from 'next/image'
import {useCallback, useEffect, useRef, useState} from 'react'

const PlayIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21" />
  </svg>
)

const PauseIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
)

export const PhotoCardVideo = ({src}: {src: string}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [showIcon, setShowIcon] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(null)

  const toggle = useCallback(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    if (video.paused) {
      void video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }

    setShowIcon(true)

    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
    }

    hideTimer.current = setTimeout(() => setShowIcon(false), 800)
  }, [])

  useEffect(() => {
    return () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 cursor-pointer" onClick={toggle}>
      <video ref={videoRef} src={src} muted autoPlay={false} loop playsInline className="w-full h-full object-cover" />
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
        style={{opacity: showIcon ? 1 : 0}}
      >
        <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center">
          {playing ? <PlayIcon /> : <PauseIcon />}
        </div>
      </div>
      {!playing && (
        <div className="absolute right-3 top-[12.47px] rounded-2xl overflow-hidden">
          <div className="opacity-100 w-8 h-8 rounded-full flex items-center justify-center bg-black/50">
            <Image src="/svg/video.svg" alt="video-icon" width={16} height={16} />
          </div>
        </div>
      )}
    </div>
  )
}
