import {Section, SectionParagraph, SectionTitle, Timeline} from './ui'

export const Agenda = () => (
  <Section
    left={
      <div className="flex flex-col gap-6 w-full">
        <SectionTitle eyebrow="Plán">Svatební den</SectionTitle>
        <div>
          <SectionParagraph className="max-w-130">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, sed efficitur ligula.
            Donec a nunc eget nisl convallis commodo. Donec ut nisi sed enim efficitur efficitur.
          </SectionParagraph>
        </div>
      </div>
    }
    right={
      <div className="flex flex-col w-full items-center justify-center">
        <Timeline
          items={[
            {from: '10:00', name: 'Příjezd hostů', to: '11:00'},
            {from: '11:00', name: 'Svatební obřad', to: '11:45'},
            {from: '11:45', name: 'Gratulace & společné foto', to: '12:30'},
            {from: '12:30', name: 'Svatební oběd', to: '14:00'},
            {from: '14:00', name: 'Krájení dortu', to: '14:30'},
            {from: '14:30', name: 'Házení kytice & volná zábava', to: '16:00'},
            {from: '16:00', name: 'Focení s novomanželi', to: '17:00'},
            {from: '17:00', name: 'Večerní raut', to: '19:00'},
            {from: '19:00', name: 'První tanec & párty', to: '22:00'},
            {from: '22:00', name: 'Noční překvapení & afterparty', to: '24:00'},
          ]}
        />
      </div>
    }
  />
)
