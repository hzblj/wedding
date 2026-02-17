import {ListSlider, SectionParagraph, SectionTitle} from './ui'

export const Gallery = () => (
  <section className="flex flex-col flex-none place-content-[center_flex-start] items-center gap-16 w-full h-min p-[96px_32px] relative overflow-hidden border-y border-solid border-white/10">
    <div className="flex flex-col gap-6">
      <SectionTitle eyebrow="Where memory lives" className="w-full items-center">
        Gallery
      </SectionTitle>
      <SectionParagraph className="max-w-130 text-center">
        Lorem ipsum dolor sit amet, consectetur <strong>adipiscing</strong> elit. Donec suscipit auctor dui, sed
        efficitur ligula. Donec a nunc eget nisl convallis commodo. Donec ut nisi sed enim efficitur efficitur.
      </SectionParagraph>
    </div>
    <ListSlider />
  </section>
)
