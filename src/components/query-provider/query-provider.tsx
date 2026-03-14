'use client'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {type FC, type ReactNode, useState} from 'react'

type QueryProviderProps = {
  children: ReactNode
}

export const QueryProvider: FC<QueryProviderProps> = ({children}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 30_000,
          },
        },
      })
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
