'use client'

import {type FC, type ReactNode, createContext, useContext} from 'react'

import type {Locale} from './config'
import type {Dictionary} from './get-dictionary'

type DictionaryContextValue = {
  dictionary: Dictionary
  locale: Locale
}

const DictionaryContext = createContext<DictionaryContextValue | null>(null)

type DictionaryProviderProps = {
  children: ReactNode
  dictionary: Dictionary
  locale: Locale
}

export const DictionaryProvider: FC<DictionaryProviderProps> = ({children, dictionary, locale}) => (
  <DictionaryContext.Provider value={{dictionary, locale}}>{children}</DictionaryContext.Provider>
)

export const useDictionary = (): DictionaryContextValue => {
  const context = useContext(DictionaryContext)

  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider')
  }

  return context
}
