import {SongRequestsTable, SongSearch} from '@/components'
import {type Locale, getDictionary, isValidLocale} from '@/i18n'
import {SectionParagraph, SectionTitle} from '@/ui'

type Params = {
  locale: string
}

const PageTitle = async ({locale}: {locale: Locale}) => {
  const dictionary = await getDictionary(locale)

  return (
    <section className="flex flex-col gap-6 items-center h-min overflow-hidden w-full p-0 flex-[0_0_auto]">
      <SectionTitle eyebrow={dictionary.music.eyebrow} className="w-full items-center text-center">
        {dictionary.music.title}
      </SectionTitle>
      <SectionParagraph className="max-w-110 text-center">
        {dictionary.music.text}
      </SectionParagraph>
    </section>
  )
}

export default async function MusicPage({params}: {params: Promise<Params>}) {
  const {locale} = await params
  const validLocale = isValidLocale(locale) ? locale : 'cz'

  return (
    <div className="flex flex-col gap-10 items-center w-full">
      <PageTitle locale={validLocale} />
      <SongSearch />
      <SongRequestsTable />
    </div>
  )
}
