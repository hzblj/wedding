'use client'

import {useRouter} from 'next/navigation'
import {useEffect} from 'react'

const POLL_INTERVAL = 30_000

export const Refresher = () => {
  const router = useRouter()

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        router.refresh()
      }
    }

    const interval = setInterval(() => router.refresh(), POLL_INTERVAL)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [router])

  return null
}
