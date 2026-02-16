import {type ReactNode} from 'react'

import {Navigation} from '@/components'

type Props = Readonly<{
  children: ReactNode
}>

export default function RootLayout({children}: Props) {
  return (
    <div className="min-h-screen w-auto bg-black flex flex-col flex-wrap items-center gap-0 p-0 overflow-visible relative">
      <Navigation />
      <div className="min-h-screen h-min p-0 relative bg-black flex-col flex-wrap w-full contents">
        <main className="flex flex-col flex-wrap flex-none items-start gap-0 w-full max-w-450 h-min p-0 relative">
          {children}
        </main>
      </div>
    </div>
  )
}
