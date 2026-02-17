import type {FC, ReactNode} from 'react'

export type SectionProps = {
  left: ReactNode
  right?: ReactNode
}

export const Section: FC<SectionProps> = ({right, left}) => (
  <section className="flex flex-col md:flex-row flex-none place-content-[center_flex-start] items-center gap-0 w-full h-auto md:h-screen md:max-h-200 p-0 relative overflow-hidden border-t border-solid border-white/10">
    <div className="flex flex-col flex-1 place-content-center items-center gap-0 w-full md:w-px min-h-150 md:min-h-0 md:h-full p-0 relative">
      <div className="flex flex-row flex-1 place-content-center items-center gap-0 w-full h-full md:h-px p-16 xl:p-8 relative">
        {left}
      </div>
    </div>
    <div className="hidden md:block w-px h-full bg-white/10" />
    <div className="flex flex-col flex-1 place-content-center items-center gap-4 w-full md:w-px h-auto md:h-full p-0 relative">
      <div className="flex flex-col flex-1 place-content-center items-start gap-6 w-full h-auto md:h-px p-8 relative">
        {right}
      </div>
    </div>
  </section>
)
