import Image from 'next/image'
import {cn} from '@/utils'

import {Button} from './button'

const Right = () => (
  <>
    <div>
      <p className="text-gray-400 text-[14px] pt-4 uppercase">[ KDE ]</p>
      <h2 className="text-[32px] font-bold">Resort Nová Polana</h2>
    </div>
    <div>
      <p className="text-[16px] max-w-130">
        Sejdeme se ve Vile Landek, krásném místě s výhledem, zahradou a hlavně dostatkem místa pro všechny, co nás mají
        rádi.
      </p>
    </div>
    <div>
      <Button>
        <Image src="/svg/navigate.svg" alt="navigate" width={16} height={16} className="w-4 h-4" />
        Navigovat
      </Button>
    </div>
  </>
)

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
  <section className="flex flex-col md:flex-row flex-none place-content-[center_flex-start] items-center gap-0 w-full h-auto md:h-screen md:max-h-200 p-0 relative overflow-hidden border-y border-solid border-white/10">
    <div className="flex flex-col flex-1 place-content-center items-center gap-0 w-full md:w-px min-h-150 md:min-h-0 md:h-full p-0 relative">
      <div className="flex flex-row flex-1 place-content-center items-center gap-0 w-full h-full md:h-px p-16 xl:p-8 relative">
        <PlaceImage />
      </div>
    </div>
    <div className="hidden md:block w-px h-full bg-white/10" />
    <div className="flex flex-col flex-1 place-content-center items-center gap-4 w-full md:w-px h-auto md:h-full p-0 relative">
      <div className="flex flex-col flex-1 place-content-center items-start gap-6 w-full h-auto md:h-px p-8 relative">
        <Right />
      </div>
    </div>
  </section>
)
