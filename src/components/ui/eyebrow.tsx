import type {ReactNode} from 'react'
import {cn} from '@/utils'

export type EyebrowProps = {
  children: ReactNode
  className?: string
}

export const Eyebrow = ({children, className}: EyebrowProps) => (
  <p className={cn('text-gray-400 text-[14px] leading-4 uppercase', className)}>[ {children} ]</p>
)
