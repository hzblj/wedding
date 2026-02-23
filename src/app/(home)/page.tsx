import {Agenda, FAQ, Footer, Gallery, Header, Place, SeatingArrangement} from '@/components'

export default function HomePage() {
  return (
    <>
      <Header />
      <Place id="where" />
      <Agenda id="agenda" />
      <Gallery id="gallery" />
      <SeatingArrangement id="seating" />
      <FAQ id="faq" />
      <Footer />
    </>
  )
}
