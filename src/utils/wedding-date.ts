export const WEDDING_START_AT = new Date('2026-07-04T10:00:00+02:00')

export const isWeddingStarted = (now: Date = new Date()) => now.getTime() >= WEDDING_START_AT.getTime()
