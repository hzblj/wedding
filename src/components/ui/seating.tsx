import {CSSProperties, Fragment} from 'react'

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

export const SeatingArrangementTables = ({main, left, right}: SeatingArrangementTablesProps) => {
  const headLeft = left[0]?.head
  const headRight = right[0]?.head
  const leftSeats = left.flatMap(t => t.seats)
  const rightSeats = right.flatMap(t => t.seats)
  const maxRows = Math.max(leftSeats.length, rightSeats.length)

  return (
    <div
      className="grid items-center gap-x-4 gap-y-2 w-full max-w-3xl"
      style={{
        gridTemplateColumns: 'auto 12px auto 1fr auto 12px auto',
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
  )
}
