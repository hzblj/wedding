import type {FC, ReactNode} from 'react'

import {cn} from '@/utils'

export type SectionParagraphProps = {
  children: ReactNode
  className?: string
}

export const SectionParagraph: FC<SectionParagraphProps> = ({children, className}) => (
  <p className={cn('text-[16px] leading-[150%] tracking-normal  text-white text-left', className)}>{children}</p>
)
