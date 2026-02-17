'use client'

import {CSSProperties, Fragment, useCallback, useState} from 'react'

import {cn} from '@/utils'

export type SideTable = {
  head?: string
  seats: [string, string][]
}

export type SeatingArrangementTablesProps = {
  main: string[]
  left: SideTable[]
  right: SideTable[]
}

type NameLabelProps = {
  children: string
  className?: string
  style?: CSSProperties
}

const NameLabel = ({children, className, style}: NameLabelProps) => (
  <span className={cn('text-[12px] tracking-wider text-white/70 whitespace-nowrap', className)} style={style}>
    {children}
  </span>
)

const GRID_WIDTH = 768

export const SeatingArrangementTables = ({main, left, right}: SeatingArrangementTablesProps) => {
  const headLeft = left[0]?.head
  const headRight = right[0]?.head
  const leftSeats = left.flatMap(t => t.seats)
  const rightSeats = right.flatMap(t => t.seats)
  const maxRows = Math.max(leftSeats.length, rightSeats.length)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState<number>()

  const wrapperRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) {
      return
    }

    const grid = node.firstElementChild as HTMLElement | null

    const update = () => {
      const s = Math.min(1, node.clientWidth / GRID_WIDTH)
      setScale(s)

      if (grid) {
        setHeight(grid.scrollHeight * s)
      }
    }

    update()

    const ro = new ResizeObserver(update)
    ro.observe(node)

    if (grid) {
      ro.observe(grid)
    }
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} className="w-full max-w-3xl overflow-hidden" style={{height}}>
      <div
        className="grid items-center gap-x-4 gap-y-2 origin-top-left"
        style={{
          gridTemplateColumns: 'auto 12px auto 1fr auto 12px auto',
          transform: `scale(${scale})`,
          width: `${GRID_WIDTH}px`,
        }}
      >
        <div className="flex gap-4 justify-center flex-wrap pb-2" style={{gridColumn: '1 / -1', gridRow: 1}}>
          {main.map((name, index) => (
            <NameLabel key={name + index.toString()}>{name}</NameLabel>
          ))}
        </div>

        <div
          className="border-t-12 border-l-12 border-r-12 border-b-0 border-white/10 rounded-t-lg self-stretch"
          style={{gridColumn: '2 / 7', gridRow: `2 / ${maxRows + 3}`}}
        />

        {headLeft && (
          <NameLabel className="text-right" style={{gridColumn: 1, gridRow: 2}}>
            {headLeft}
          </NameLabel>
        )}

        {headRight && <NameLabel style={{gridColumn: 7, gridRow: 2}}>{headRight}</NameLabel>}

        {Array.from({length: maxRows}, (_, i) => (
          <Fragment key={i}>
            <NameLabel className="text-right" style={{gridColumn: 1, gridRow: i + 3}}>
              {leftSeats[i]?.[0] ?? ''}
            </NameLabel>
            <NameLabel style={{gridColumn: 3, gridRow: i + 3}}>{leftSeats[i]?.[1] ?? ''}</NameLabel>
            <NameLabel className="text-right" style={{gridColumn: 5, gridRow: i + 3}}>
              {rightSeats[i]?.[0] ?? ''}
            </NameLabel>
            <NameLabel style={{gridColumn: 7, gridRow: i + 3}}>{rightSeats[i]?.[1] ?? ''}</NameLabel>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
