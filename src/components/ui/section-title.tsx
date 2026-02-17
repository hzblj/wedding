import type {FC, ReactNode} from 'react'

import {cn} from '@/utils'

import {Eyebrow} from './eyebrow'

export type SectionTitleProps = {
  eyebrow: string
  children: ReactNode
  className?: string
}

export const SectionTitle: FC<SectionTitleProps> = ({children, eyebrow, className}) => (
  <div className={cn('flex flex-none gap-2 h-min p-0 relative overflow-hidden flex-col w-full', className)}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="text-[32px] leading-9.5 font-bold uppercase">{children}</h2>
  </div>
)
