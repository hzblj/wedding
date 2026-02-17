import Image from 'next/image'
import {FC} from 'react'

import {cn} from '@/utils'

type PhotoCardProps = {
  image?: string
  hidden?: boolean
  isRight?: boolean
}

const PhotoCard: FC<PhotoCardProps> = ({hidden = false, image, isRight}) => (
  <div className="flex flex-row flex-[0_0_auto] gap-0 h-min p-0 relative w-min">
    <div className="flex flex-col flex-[0_0_auto] gap-0 h-min p-0 relative w-min overflow-visible">
      {!hidden && image && (
        <div className={cn('flex-[0_0_auto] relative w-87.5 max-w-full aspect-[0.7]', isRight && 'mt-8')}>
          <div className="paper-texture bg-white h-full w-full opacity-100 flex flex-col items-center gap-2 p-0 relative overflow-visible">
            <div className="flex flex-[1_0_0] flex-row items-center gap-0 w-full h-px p-[16px_16px_64px] relative overflow-hidden">
              <div className="relative overflow-hidden w-px h-full flex-[1_0_0]">
                <div className="absolute inset-0">
                  <Image src={image} alt="image" fill className="object-cover" />
                </div>
              </div>
            </div>
            <div className="opacity-80 h-auto aspect-[0.660645] z-20 flex-none w-12.25 absolute -top-8 left-1/2 overflow-visible -translate-x-1/2 rotate-90">
              <div className="absolute inset-0">
                <Image src="/png/paper.png" alt="paper" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
)

export type PhotosProps = {
  images: string[]
}

const COL_CLASS = 'flex items-start flex-[0_0_auto] flex-col gap-32 h-min p-0 relative w-min'

const ThreeColumns: FC<{images: string[]}> = ({images}) => {
  const cols = [
    images.filter((_, i) => i % 3 === 0),
    images.filter((_, i) => i % 3 === 1),
    images.filter((_, i) => i % 3 === 2),
  ]
  const maxLen = Math.max(...cols.map(c => c.length))

  return (
    <>
      {cols.map((col, colIdx) => (
        <div key={colIdx} className={COL_CLASS}>
          {Array.from({length: maxLen}, (_, i) => (
            <div key={i} className="contents">
              {[0, 1, 2].map(slot =>
                slot === colIdx ? <PhotoCard key={slot} image={col[i]} /> : <PhotoCard key={slot} hidden />
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

const TwoColumns: FC<{images: string[]}> = ({images}) => {
  const cols = [images.filter((_, i) => i % 2 === 0), images.filter((_, i) => i % 2 === 1)]
  const maxLen = Math.max(...cols.map(c => c.length))

  return (
    <>
      {cols.map((col, colIdx) => (
        <div key={colIdx} className={COL_CLASS}>
          {Array.from({length: maxLen}, (_, i) => (
            <div key={i} className="contents">
              {[0, 1].map(slot =>
                slot === colIdx ? <PhotoCard key={slot} image={col[i]} /> : <PhotoCard key={slot} hidden />
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

const SECTION_CLASS =
  'flex-row gap-8 items-start h-min overflow-visible w-full p-0 flex-[0_0_auto] content-start justify-center'

export const Photos: FC<PhotosProps> = ({images}) => (
  <>
    {/* Mobile: 1 column */}
    <section className="flex min-[768px]:hidden flex-col gap-16 items-center w-full">
      {images.map((image, i) => (
        <PhotoCard key={i} image={image} isRight />
      ))}
    </section>

    {/* Tablet: 2 columns */}
    <section className={cn('hidden min-[768px]:flex min-[1200px]:hidden', SECTION_CLASS)}>
      <TwoColumns images={images} />
    </section>

    {/* Desktop: 3 columns */}
    <section className={cn('hidden min-[1200px]:flex', SECTION_CLASS)}>
      <ThreeColumns images={images} />
    </section>
  </>
)
