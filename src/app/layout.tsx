import type {Metadata, Viewport} from 'next'
import {Inter, Playfair_Display} from 'next/font/google'
import type {ReactNode} from 'react'

import './app.css'

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: '#050505',
}

export const metadata: Metadata = {
  title: 'Karin & Jan Blažejovi',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
