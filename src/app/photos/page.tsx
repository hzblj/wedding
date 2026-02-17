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

export default async function PhotosPage() {
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

  return (
    <>
      <PageTitle />
      <Photos images={images} />
    </>
  )
}
