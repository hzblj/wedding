'use client'

import Image from 'next/image'
import {FC, useCallback, useState} from 'react'

import {PhotoCardVideo} from '@/components/photo-card-video'
import {PhotoModal} from '@/components/ui'

const VIDEO_EXTENSIONS = new Set(['mp4', 'mov', 'webm', 'avi', 'mkv'])

const isVideo = (url: string) => {
  const ext = url.split('.').pop()?.toLowerCase().split('?')[0] ?? ''
  return VIDEO_EXTENSIONS.has(ext)
}

type PhotoCardProps = {
  image?: string
  hidden?: boolean
  onSelect?: (image: string) => void
}

const PhotoCard: FC<PhotoCardProps> = ({hidden = false, image, onSelect}) => {
  const handleClick = useCallback(() => {
    if (image && onSelect) {
      onSelect(image)
    }
  }, [image, onSelect])

  return (
    <div className="relative w-full h-min">
      {!hidden && image && (
        <div className="relative w-full aspect-[0.7] cursor-pointer" onClick={handleClick}>
          <div className="paper-texture bg-white h-full w-full opacity-100 flex flex-col items-center gap-2 p-0 relative overflow-visible">
            <div className="flex flex-[1_0_0] flex-row items-center gap-0 w-full h-px p-[8px_8px_32px] md:p-[12px_12px_48px] lg:p-[16px_16px_64px] relative overflow-hidden">
              <div className="relative overflow-hidden w-px h-full flex-[1_0_0]">
                {isVideo(image) ? (
                  <PhotoCardVideo src={image} />
                ) : (
                  <div className="absolute inset-0">
                    <Image src={image} alt="image" fill className="object-cover" />
                  </div>
                )}
              </div>
            </div>
            <div className="opacity-80 h-auto aspect-[0.660645] z-20 flex-none w-6 md:w-9 lg:w-12.25 absolute -top-4 md:-top-6 lg:-top-8 left-1/2 overflow-visible -translate-x-1/2 rotate-90">
              <div className="absolute inset-0">
                <Image src="/png/paper.png" alt="paper" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export type PhotosProps = {
  images: string[]
}

const PhotoUploadEmpty = () => (
  <div className="flex flex-col items-center py-16 text-center">
    <svg
      className="w-10 h-10 text-white/15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
    <div className="pt-4">
      <p className="text-white/40 text-xl font-bold">Zatím žádné fotky</p>
      <p className="text-white/30 text-sm">Nahrajte první fotky z oslavy</p>
    </div>
  </div>
)

export const Photos: FC<PhotosProps> = ({images}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleClose = useCallback(() => {
    setSelectedImage(null)
  }, [])

  if (images.length === 0) {
    return <PhotoUploadEmpty />
  }

  const cols = [
    images.filter((_, i) => i % 3 === 0),
    images.filter((_, i) => i % 3 === 1),
    images.filter((_, i) => i % 3 === 2),
  ]

  const maxLen = Math.max(...cols.map(col => col.length))

  return (
    <>
      <section className="flex flex-row gap-4 md:gap-6 lg:gap-8 items-start justify-center w-full max-w-278.5 mx-auto">
        {cols.map((col, colIdx) => (
          <div key={colIdx} className="flex items-start flex-1 min-w-0 flex-col gap-16 md:gap-24 lg:gap-32 h-min p-0 relative">
            {Array.from({length: maxLen}, (_, rowIdx) => (
              <div key={rowIdx} className="contents">
                {[0, 1, 2].map(slot =>
                  slot === colIdx ? (
                    <PhotoCard key={slot} image={col[rowIdx]} onSelect={setSelectedImage} />
                  ) : (
                    <PhotoCard key={slot} hidden />
                  ),
                )}
              </div>
            ))}
          </div>
        ))}
      </section>
      <PhotoModal
        src={selectedImage}
        isVideo={selectedImage ? isVideo(selectedImage) : false}
        onClose={handleClose}
        videoRenderer={videoSrc => <PhotoCardVideo src={videoSrc} />}
      />
    </>
  )
}
