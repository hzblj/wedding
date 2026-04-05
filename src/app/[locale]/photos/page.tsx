import {Suspense} from 'react'

import {Photos, PhotoUpload} from '@/components'
import {type Locale, getDictionary, isValidLocale} from '@/i18n'
import {createClientServer} from '@/lib'
import {SectionParagraph, SectionTitle} from '@/ui'

type Params = {
  locale: string
}

const PageTitle = async ({locale}: {locale: Locale}) => {
  const dictionary = await getDictionary(locale)

  return (
    <section className="flex flex-col gap-6 items-center h-min overflow-hidden w-full p-0 flex-[0_0_auto]">
      <SectionTitle eyebrow={dictionary.photos.eyebrow} className="w-full items-center text-center">
        {dictionary.photos.title}
      </SectionTitle>
      <SectionParagraph className="max-w-110 text-center">
        {dictionary.photos.text}
      </SectionParagraph>
      <PhotoUpload />
    </section>
  )
}

const SkeletonCard = ({hidden = false}: {hidden?: boolean}) => (
  <div className="relative w-full h-min">
    {!hidden && (
      <div className="relative w-full aspect-[0.7]">
        <div className="paper-texture bg-white h-full w-full opacity-100 flex flex-col items-center gap-2 p-0 relative overflow-visible">
          <div className="flex flex-[1_0_0] flex-row items-center gap-0 w-full h-px p-[8px_8px_32px] md:p-[12px_12px_48px] lg:p-[16px_16px_64px] relative overflow-hidden">
            <div className="relative overflow-hidden w-px h-full flex-[1_0_0]">
              <div className="absolute inset-0 bg-black/90 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)

const SKELETON_ROWS = 1

const PhotosSkeleton = () => (
  <section className="flex flex-row gap-4 md:gap-6 lg:gap-8 items-start justify-center w-full max-w-278.5 mx-auto">
    {Array.from({length: 3}, (_, colIdx) => (
      <div
        key={colIdx}
        className="flex items-start flex-1 min-w-0 flex-col gap-16 md:gap-24 lg:gap-32 h-min p-0 relative"
      >
        {Array.from({length: SKELETON_ROWS}, (_, rowIdx) => (
          <div key={rowIdx} className="contents">
            {[0, 1, 2].map(slot => (
              <SkeletonCard key={slot} hidden={slot !== colIdx} />
            ))}
          </div>
        ))}
      </div>
    ))}
  </section>
)

const PhotosList = async () => {
  const supabase = await createClientServer()

  const {data} = await supabase.storage.from('public-bucket').list('', {
    sortBy: {column: 'created_at', order: 'desc'},
  })

  const images = (data ?? [])
    .filter(file => file.name !== '.emptyFolderPlaceholder')
    .map(file => {
      const {data: url} = supabase.storage.from('public-bucket').getPublicUrl(file.name)
      return url.publicUrl
    })

  return <Photos images={images} />
}

export default async function PhotosPage({params}: {params: Promise<Params>}) {
  const {locale} = await params
  const validLocale = isValidLocale(locale) ? locale : 'cz'

  return (
    <>
      <PageTitle locale={validLocale} />
      <Suspense fallback={<PhotosSkeleton />}>
        <PhotosList />
      </Suspense>
    </>
  )
}
