import {Photos} from '@/components'
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
      <Photos />
    </>
  )
}
