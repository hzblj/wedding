import {sendGAEvent} from '@next/third-parties/google'

export type ClickSource = 'nav_desktop' | 'nav_mobile' | 'home_cta'

export const trackPhotosClick = (source: ClickSource) => {
  sendGAEvent('event', 'photos_click', {source})
}

export const trackMusicClick = (source: ClickSource) => {
  sendGAEvent('event', 'music_click', {source})
}
