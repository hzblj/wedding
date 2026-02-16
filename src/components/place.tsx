import Image from 'next/image'
import {cn} from '@/utils'

import {Button, Eyebrow, Section} from './ui'

type PlaceImagePaperProps = {
  variant?: 'top-left' | 'bottom-right'
}

const PlaceImagePaper = ({variant = 'bottom-right'}: PlaceImagePaperProps) => (
  <div
    className={cn(
      'opacity-80 aspect-[0.660645] h-37 z-1 flex-none w-24.5 absolute overflow-visible',
      variant === 'top-left' && '-top-8 -left-8 rotate-152',
      variant === 'bottom-right' && '-bottom-8 -right-8 rotate-152'
    )}
  >
    <div className="absolute inset-0 rounded-inherit">
      <Image src="/png/paper.png" alt="paper" fill className="object-cover" />
    </div>
  </div>
)

const PlaceImage = () => (
  <div className="flex-1 w-full md:w-px max-w-110 h-125 md:h-110 md:max-h-110 xl:h-150 xl:max-h-150 relative">
    <div className="paper-texture bg-white h-full max-h-full max-w-full w-full -rotate-[2.5deg]">
      <div className="z-1 flex-none absolute inset-[16px_16px_64px] overflow-hidden">
        <Image src="https://picsum.photos/id/1/800/1200" alt="place" fill className="object-cover" />
      </div>
      <PlaceImagePaper variant="top-left" />
      <PlaceImagePaper variant="bottom-right" />
    </div>
  </div>
)

export const Place = () => (
  <Section
    left={<PlaceImage />}
    right={
      <>
        <div>
          <Eyebrow className="pt-4">Kde</Eyebrow>
          <h2 className="text-[32px] font-bold">Resort Nová Polana</h2>
        </div>
        <div>
          <p className="text-[16px] max-w-130">
            Sejdeme se ve Vile Landek, krásném místě s výhledem, zahradou a hlavně dostatkem místa pro všechny, co nás
            mají rádi.
          </p>
        </div>
        <div>
          <Button>
            <Image src="/svg/navigate.svg" alt="navigate" width={16} height={16} className="w-4 h-4" />
            Navigovat
          </Button>
        </div>
      </>
    }
  />
)
