import {Agenda, FAQ, Footer, Gallery, Header, Place, SeatingArrangement, WeddingDate} from '@/components'

export default function HomePage() {
  return (
    <>
      <Header />
      <WeddingDate id="date" />
      <Place id="where" />
      <Agenda id="agenda" />
      <Gallery id="gallery" />
      <SeatingArrangement id="seating" />
      <FAQ id="faq" />
      <Footer />
    </>
  )
}
