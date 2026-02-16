import Image from 'next/image'
import {cn} from '@/utils'

import {Button} from './ui'

const HeaderImage = ({className = ''}: {className?: string}) => (
  <div className={cn('bg-white h-84 w-auto max-w-50 p-2 paper-texture', className)}>
    <Image
      src="https://picsum.photos/id/1/800/1200"
      alt="image"
      width={256}
      height={306}
      className="h-full w-full object-cover"
      draggable={false}
    />
  </div>
)

const HeaderImages = () => (
  <div className="flex flex-row items-start relative w-full px-8 gap-4 shrink-0">
    <div className="flex relative items-start shrink-0">
      <HeaderImage />
    </div>
    <div className="flex flex-row relative p-0 w-fit ml-auto gap-4 shrink-0">
      <HeaderImage />
      <HeaderImage className="hidden sm:block" />
      <HeaderImage className="hidden min-[1200px]:block" />
    </div>
  </div>
)

const HeaderInfo = () => (
  <div className="flex flex-col md:flex-row md:flex-wrap flex-none items-start md:items-center justify-between md:justify-center w-full h-min px-8 relative gap-6 md:gap-x-8 md:gap-y-6 mt-auto">
    <div className="relative flex flex-col justify-center outline-none h-auto w-auto min-w-0 shrink">
      <h1 className="font-playfair font-bold text-[56px] md:text-[62px] lg:text-[104px] lg:leading-[0.9] uppercase">
        Blažejovi
      </h1>
    </div>
    <div className="flex flex-col basis-0 md:basis-75 lg:basis-90 max-w-100 md:ml-auto gap-4">
      <p className="text-[16px] text-white text-left">
        S radostí v srdci vás zveme, abyste s námi sdíleli jeden z nejkrásnějších dnů našeho života – den naší svatby.
      </p>
      <p className="text-[14px] text-gray-400 text-left">4. července 2026, Resort Nová Polana, Dolní Lomná</p>
      <div className="pt-2">
        <Button>
          <Image src="/svg/calendar-plus.svg" alt="calendar" width={16} height={16} className="w-4 h-4" />
          Přidat do kalendáře
        </Button>
      </div>
      <span className="text-gray-400 text-[14px] pt-2 uppercase">[ VÍCE INFORMACÍ ]</span>
    </div>
  </div>
)

export const Header = () => (
  <header className="flex flex-col flex-none items-center justify-between w-full h-screen max-h-215 relative overflow-hidden pt-36 pb-8">
    <HeaderImages />
    <HeaderInfo />
  </header>
)
