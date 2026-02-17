import {PhotoUpload, Photos} from '@/components'
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
  </section>
)

export default function PhotosPage() {
  return (
    <>
      <PageTitle />
      <PhotoUpload />
      <Photos
        images={[
          'https://picsum.photos/id/10/800/1200',
          'https://picsum.photos/id/11/800/1200',
          'https://picsum.photos/id/12/800/1200',
          'https://picsum.photos/id/13/800/1200',
          'https://picsum.photos/id/14/800/1200',
          'https://picsum.photos/id/15/800/1200',
          'https://picsum.photos/id/16/800/1200',
          'https://picsum.photos/id/17/800/1200',
          'https://picsum.photos/id/18/800/1200',
          'https://picsum.photos/id/19/800/1200',
          'https://picsum.photos/id/20/800/1200',
          'https://picsum.photos/id/21/800/1200',
          'https://picsum.photos/id/22/800/1200',
          'https://picsum.photos/id/23/800/1200',
        ]}
      />
    </>
  )
}
