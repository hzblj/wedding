import {forwardRef, type ReactNode} from 'react'

export type SectionProps = {
  id?: string
  left: ReactNode
  right?: ReactNode
}

export const Section = forwardRef<HTMLElement, SectionProps>(({id, right, left}, ref) => (
  <section ref={ref} id={id} className="flex flex-col md:flex-row flex-none place-content-[center_flex-start] items-stretch gap-0 w-full h-auto p-0 relative border-t border-solid border-border">
    <div className="flex flex-col flex-1 place-content-center items-center gap-0 w-full md:w-px p-0 relative">
      <div className="flex flex-row flex-1 place-content-center items-center gap-0 w-full py-16 px-6 xl:p-8 relative">
        {left}
      </div>
    </div>
    <div className="hidden md:block w-px bg-border" />
    <div className="flex flex-col flex-1 place-content-center items-center gap-4 w-full md:w-px h-auto p-0 relative">
      <div className="flex flex-col flex-1 place-content-center items-start gap-6 w-full h-auto pt-6 pb-18 px-6 md:p-8 relative">
        {right}
      </div>
    </div>
  </section>
))

Section.displayName = 'Section'
