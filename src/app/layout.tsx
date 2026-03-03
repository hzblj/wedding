import type {Metadata, Viewport} from 'next'
import {Inter, Playfair_Display} from 'next/font/google'
import {type ReactNode} from 'react'

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

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  description: 'Svatba Karin & Jana — všechny informace o našem velkém dni.',
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      {sizes: '32x32', url: '/favicon-32x32.png'},
      {sizes: '16x16', url: '/favicon-16x16.png'},
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    images: ['/png/og-image.png'],
    title: 'Karin & Jan Blažejovi',
  },
  title: 'Karin & Jan Blažejovi',
}

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="cz" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
