import type {FC} from 'react'

import {cn} from '@/utils'

export type TimelineItem = {
  name: string
  from: string
  to?: string
}

const TimelineDot = () => (
  <div className="absolute -left-7.25 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-solid border-border bg-border/30 shadow-[0_0_6px_rgba(62,51,43,0.15)] backdrop-blur-sm flex items-center justify-center">
    <div className="w-1.5 h-1.5 rounded-full bg-heading" />
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
            'absolute -left-6 w-px bg-border',
            isFirst ? 'top-1/2 -bottom-6' : 'top-0',
            isLast ? 'bottom-1/2' : '-bottom-6'
          )}
        />
      )}
      <TimelineDot />
      <p className="text-[14px] leading-[150%] text-body/60 uppercase w-auto block">
        {item.from}
        {item.to ? ` — ${item.to}` : ''}
      </p>
      <p className="text-[18px] leading-[150%] text-heading">{item.name}</p>
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
