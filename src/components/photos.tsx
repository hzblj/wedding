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
        <div className={cn('flex-[0_0_auto] relative h-125 w-87.5', isRight && 'mt-8')}>
          <div className="paper-texture bg-white h-full w-full opacity-100 flex flex-col items-center gap-2 p-0 relative">
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

export const Photos = () => (
  <section className="flex flex-row gap-8 items-start h-min overflow-visible w-full p-0 flex-[0_0_auto] content-start justify-center">
    <div className="flex items-start flex-[0_0_auto] flex-col gap-36 h-min p-0 relative w-min">
      <PhotoCard image="https://picsum.photos/id/1/800/1200" />
      <PhotoCard hidden />
      <PhotoCard image="https://picsum.photos/id/1/800/1200" />
    </div>
    <div className="flex items-start flex-[0_0_auto] flex-col gap-36 h-min p-0 relative w-min">
      <PhotoCard hidden />
      <PhotoCard image="https://picsum.photos/id/1/800/1200" isRight />
      <PhotoCard hidden />
      <PhotoCard image="https://picsum.photos/id/1/800/1200" isRight />
    </div>
  </section>
)
