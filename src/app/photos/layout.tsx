import {type ReactNode, ViewTransition} from 'react'

type Props = Readonly<{
  children: ReactNode
}>

export default function Layout({children}: Props) {
  return (
    <ViewTransition name="page" update="none">
      <div className="min-h-screen w-auto app-background grain flex flex-col flex-wrap items-center gap-0 p-0 overflow-visible relative">
        <div className="min-h-screen h-min p-0 relative flex-col flex-wrap w-full contents">
          <main className="flex flex-col flex-[0_0_auto] items-center gap-24 w-full h-min relative p-[144px_32px_96px]">
            {children}
          </main>
        </div>
      </div>
    </ViewTransition>
  )
}
