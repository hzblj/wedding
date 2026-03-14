import type {ReactNode} from 'react'
import {cn} from '@/utils'

export type EyebrowProps = {
  children: ReactNode
  className?: string
}

export const Eyebrow = ({children, className}: EyebrowProps) => (
  <p className={cn('text-body/60 text-[16px] leading-5 uppercase', className)}>[ {children} ]</p>
)
