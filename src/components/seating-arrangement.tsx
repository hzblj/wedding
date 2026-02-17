import {SeatingArrangementTables, SectionParagraph, SectionTitle} from './ui'

export const SeatingArrangement = () => (
  <section className="flex flex-col flex-none place-content-[center_flex-start] items-center gap-16 w-full h-min p-[96px_24px] md:p-[96px_32px] relative overflow-hidden border-t border-solid border-white/10">
    <div className="flex flex-col gap-6">
      <SectionTitle eyebrow="Kde sedím" className="w-full items-center">
        Zasedací pořádek
      </SectionTitle>
      <SectionParagraph className="max-w-130 text-center">
        Lorem ipsum dolor sit amet, consectetur <strong>adipiscing</strong> elit. Donec suscipit auctor dui, sed
        efficitur ligula. Donec a nunc eget nisl convallis commodo. Donec ut nisi sed enim efficitur efficitur.
      </SectionParagraph>
    </div>
    <SeatingArrangementTables
      main={['Darius Lebeda', 'Ligia Lebedová', 'Karin Blažej', 'Jan Blažej', 'Iva Konečná', 'Radim Konečný']}
      left={[
        {
          head: 'Marta Dänemarková',
          seats: [
            ['Andrzej Dänemark', 'Dawid Lebeda'],
            ['Krystyna Lebeda', 'Barbara Firla'],
            ['Rychard Lebeda', 'Hana Donociková'],
            ['Jiřina Lebeda', 'Vladimír Sedlák'],
            ['Bogdan Lebeda', 'Małgorzata Franek'],
            ['Ester Kendziurová', 'Barbara Lebeda'],
            ['Radka Dänemarková', 'Nela Dänemarková'],
            ['Roman Dänemark', 'Adam Dänemark'],
            ['Dorota Giemza', 'Magdalena Bubík'],
            ['Łukasz Giemza', 'Janina Gaurová'],
            ['Edyta Giemzová', 'Krystyna Ivanov'],
            ['Marcel Giemza', ''],
          ],
        },
      ]}
      right={[
        {
          head: 'Miluše Teichmanová',
          seats: [
            ['Marek Buš', 'Jiří Teichman'],
            ['Kristýna Buš', 'Radim Teichman'],
            ['Lukáš Teichman', 'Miriam Teichmanová'],
            ['Šimon Rico', 'Jaroslav Maťas'],
            ['Kateryna Holotova', 'Ema'],
            ['Eva Rojíková', 'Tereza Balejová'],
            ['Vojta Bínek', 'Tomáš Balej'],
            ['Miroslav Honysch', 'Klára Honysch'],
            ['Ondřej Valuštík', 'Veronika Valuštíková'],
            ['Jan Holínka', 'Kateřina Faktorová'],
            ['Foto Pavel', 'DJ Štěpa'],
            ['Kamera Vít', ''],
          ],
        },
      ]}
    />
  </section>
)
