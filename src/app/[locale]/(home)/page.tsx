import {Agenda, FAQ, Footer, Gallery, Header, Menu, Music, Place, SeatingArrangement, WeddingDate} from '@/components'

export default function HomePage() {
  const hideSeatingArrangement = true

  return (
    <>
      <Header />
      <WeddingDate id="date" />
      <Place id="where" />
      <Agenda id="agenda" />
      <Gallery id="gallery" />
      {!hideSeatingArrangement && <SeatingArrangement id="seating" />}
      <Menu id="menu" />
      <FAQ id="faq" />
      <Music id="music" />
      <Footer />
    </>
  )
}
