import {GoogleAnalytics} from '@next/third-parties/google'
import type {Viewport} from 'next'
import {Inter, Playfair_Display} from 'next/font/google'
import {type ReactNode} from 'react'

import './app.css'

const GA_MEASUREMENT_ID = 'G-JE80ZGP2N8'

export const viewport: Viewport = {
  themeColor: '#e8ddd0',
  viewportFit: 'cover',
}

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  weight: ['400', '500', '700'],
})

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  )
}
