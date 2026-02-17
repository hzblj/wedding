import type {FC} from 'react'

import {cn} from '@/utils'

export type TimelineItem = {
  name: string
  from: string
  to?: string
}

const TimelineDot = () => (
  <div className="absolute -left-7.25 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-solid border-white/40 bg-white/10 shadow-[0_0_6px_rgba(255,255,255,0.2)] backdrop-blur-sm flex items-center justify-center">
    <div className="w-1.5 h-1.5 rounded-full bg-white" />
  </div>
)

type TimelineRowProps = {
  item: TimelineItem
  isFirst: boolean
  isLast: boolean
}

const TimelineRow: FC<TimelineRowProps> = ({item, isFirst, isLast}) => (
  <div className={cn('pl-6', !isLast && 'pb-6')}>
    <div className="relative">
      {!(isFirst && isLast) && (
        <div
          className={cn(
            'absolute -left-6 w-px bg-white/20',
            isFirst ? 'top-1/2 -bottom-6' : 'top-0',
            isLast ? 'bottom-1/2' : '-bottom-6'
          )}
        />
      )}
      <TimelineDot />
      <p className="text-[12px] leading-[150%] text-gray-400 uppercase w-auto block">
        {item.from}
        {item.to ? ` — ${item.to}` : ''}
      </p>
      <p className="text-[16px] leading-[150%] text-white uppercase">{item.name}</p>
    </div>
  </div>
)

export type TimelineProps = {
  items: TimelineItem[]
}

export const Timeline = ({items}: TimelineProps) => (
  <div className="flex flex-col">
    {items.map((item, index) => (
      <TimelineRow key={index.toString()} item={item} isFirst={index === 0} isLast={index === items.length - 1} />
    ))}
  </div>
)
