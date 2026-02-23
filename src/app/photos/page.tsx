import {Suspense} from 'react'

import {Photos, PhotoUpload} from '@/components'
import {createClientServer} from '@/lib'
import {SectionParagraph, SectionTitle} from '@/ui'

const PageTitle = () => (
  <section className="flex flex-col gap-6 items-center h-min overflow-hidden w-full p-0 flex-[0_0_auto]">
    <SectionTitle eyebrow="Share" className="w-full items-center text-center">
      Photos
    </SectionTitle>
    <SectionParagraph className="max-w-130 text-center">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur ligula. Donec a
      nunc eget nisl convallis commodo. Donec ut nisi sed enim efficitur efficitur.
    </SectionParagraph>
    <PhotoUpload />
  </section>
)

const SkeletonCard = ({hidden = false}: {hidden?: boolean}) => (
  <div className="relative w-full h-min">
    {!hidden && (
      <div className="relative w-full aspect-[0.7]">
        <div className="paper-texture bg-white h-full w-full opacity-100 flex flex-col items-center gap-2 p-0 relative overflow-visible">
          <div className="flex flex-[1_0_0] flex-row items-center gap-0 w-full h-px p-[8px_8px_32px] md:p-[12px_12px_48px] lg:p-[16px_16px_64px] relative overflow-hidden">
            <div className="relative overflow-hidden w-px h-full flex-[1_0_0]">
              <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)

const SKELETON_ROWS = 3

const PhotosSkeleton = () => (
  <section className="flex flex-row gap-4 md:gap-6 lg:gap-8 items-start justify-center w-full max-w-278.5 mx-auto">
    {Array.from({length: 3}, (_, colIdx) => (
      <div key={colIdx} className="flex items-start flex-1 min-w-0 flex-col gap-16 md:gap-24 lg:gap-32 h-min p-0 relative">
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

export default function PhotosPage() {
  return (
    <>
      <PageTitle />
      <Suspense fallback={<PhotosSkeleton />}>
        <PhotosList />
      </Suspense>
    </>
  )
}
