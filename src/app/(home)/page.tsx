import {Agenda, FAQ, Footer, Gallery, Header, Place, SeatingArrangement} from '@/components'

export default function HomePage() {
  return (
    <>
      <Header />
      <Place id="where" />
      <Gallery id="gallery" />
      <Agenda id="agenda" />
      <SeatingArrangement id="seating" />
      <FAQ id="faq" />
      <Footer />
    </>
  )
}
