import {SongRequestsTable, SongSearch} from '@/components'
import {SectionParagraph, SectionTitle} from '@/ui'

const PageTitle = () => (
  <section className="flex flex-col gap-6 items-center h-min overflow-hidden w-full p-0 flex-[0_0_auto]">
    <SectionTitle eyebrow="Přej si" className="w-full items-center text-center">
      Hudba
    </SectionTitle>
    <SectionParagraph className="max-w-110 text-center">
      Přejte si písničku, kterou chcete slyšet na svatbě.
    </SectionParagraph>
  </section>
)

export default function MusicPage() {
  return (
    <div className="flex flex-col gap-10 items-center w-full">
      <PageTitle />
      <SongSearch />
      <SongRequestsTable />
    </div>
  )
}
