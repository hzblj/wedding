import {type ReactNode} from 'react'

type Props = Readonly<{
  children: ReactNode
}>

export default function RootLayout({children}: Props) {
  return (
    <div className="min-h-screen w-auto bg-black flex flex-col flex-wrap items-center gap-0 p-0 overflow-visible relative">
      <div
        className="min-h-screen h-min p-0 relative overflow-hidden bg-black w-auto contents flex-col flex-wrap"
        style={{
          placeContent: 'center flex-start',
        }}
      >
        <main className="flex flex-col flex-wrap flex-none place-content-start items-start gap-0 w-full max-w-450 h-min p-0 relative overflow-hidden">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  )
}
