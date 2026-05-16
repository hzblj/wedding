import {sendGAEvent} from '@next/third-parties/google'

export type ClickSource = 'nav_desktop' | 'nav_mobile' | 'home_cta'

const isEnabled = process.env.NODE_ENV === 'production'

export const trackPhotosClick = (source: ClickSource) => {
  if (!isEnabled) {
    return
  }
  sendGAEvent('event', 'photos_click', {source})
}

export const trackMusicClick = (source: ClickSource) => {
  if (!isEnabled) {
    return
  }
  sendGAEvent('event', 'music_click', {source})
}
