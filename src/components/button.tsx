import type {ButtonHTMLAttributes, ReactNode} from 'react'
import {cn} from '@/utils'

type ButtonProps = {
  children: ReactNode
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({children, className, ...props}: ButtonProps) => (
  <button
    className={cn(
      'inline-flex items-center gap-2 uppercase text-sm font-medium bg-white text-black px-6 py-3 rounded-full hover:bg-white/80 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer',
      className
    )}
    {...props}
  >
    {children}
  </button>
)
