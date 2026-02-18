import type {Metadata, Viewport} from 'next'
import {Inter, Playfair_Display} from 'next/font/google'
import {type ReactNode, ViewTransition} from 'react'

import {Navigation} from '@/components'

import './app.css'

export const viewport: Viewport = {
  themeColor: '#050505',
  viewportFit: 'cover',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  title: 'Karin & Jan Blažejovi',
}

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '700'],
})

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navigation />
        <ViewTransition name="page">
          {children}
        </ViewTransition>
      </body>
    </html>
  )
}
