import {SectionTitle} from './ui'

export const Footer = () => (
  <footer className="flex flex-col md:flex-row flex-none place-content-[center_flex-start] items-center gap-0 w-full h-auto md:h-screen md:max-h-60 p-0 relative overflow-hidden border-t border-solid border-white/10">
    <div className="flex flex-col flex-1 place-content-center items-center gap-4 w-full md:w-px h-auto md:h-full p-0 relative">
      <div className="flex flex-col flex-1 place-content-center items-start w-full h-auto md:h-px px-6 py-8 md:p-8 relative">
        <SectionTitle eyebrow="závěrem">Těšíme se na každého z vás.</SectionTitle>
      </div>
    </div>
    <div className="flex flex-col flex-1 place-content-center items-center gap-4 w-full md:w-px h-auto md:h-full p-0 relative border-t md:border-t-0 md:border-l border-solid border-white/10">
      <div className="flex flex-col flex-1 place-content-center items-start gap-6 w-full h-auto md:h-px px-6 py-8 md:p-8 relative">
        <h2 className="font-bold text-4xl uppercase leading-4">© 2026</h2>
        <h2 className="font-bold text-4xl uppercase leading-4">Karin & Jan</h2>
        <h2 className="font-bold text-4xl uppercase leading-4">Blažejovi</h2>
      </div>
    </div>
  </footer>
)
