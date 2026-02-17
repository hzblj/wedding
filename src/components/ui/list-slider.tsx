import Image from 'next/image'

const ListSliderItem = () => (
  <li className="contents">
    <div
      className="shrink-0 h-full transform-none w-[calc(33.3333%-10.6667px)]"
      style={{
        opacity: 1, // left right 0.8
        transformOrigin: '100% 50% 0px', // animated
        visibility: 'visible', // Hiddne
      }}
    >
      <div className="paper-texture bg-white h-full w-full opacity-100 flex flex-col items-center gap-2 p-0 relative overflow-hidden">
        <div className="flex flex-[1_0_0] flex-row items-center gap-0 w-full h-px p-[16px_16px_0px] relative overflow-hidden">
          <div className="relative overflow-hidden w-px h-full flex-[1_0_0]">
            <div className="absolute inset-0">
              <Image src="https://picsum.photos/id/1/800/1200" alt="place" fill className="object-cover" />
            </div>
          </div>
        </div>
        <div className="flex flex-none flex-row items-start place-content-[flex-start_space-between] w-full h-min p-[8px_16px_16px] relative overflow-hidden">
          <div className="flex flex-col justify-start outline-none whitespace-pre-wrap wrap-break-word break-normal flex-[1_0_0] w-px h-auto relative max-w-30">
            <p className="font-semibold text-black text-[20px] leading-[120%] uppercase">Jan &{'\n'}Simon</p>
          </div>
          <div className="flex flex-col flex-none items-end gap-1 w-min h-min p-0 relative overflow-hidden ml-auto">
            <div className="flex flex-col justify-end flex-none w-auto h-auto relative whitespace-pre">
              <p className="text-[12px] text-black text-right uppercase leading-[13.2px]">Červenec, 2024</p>
            </div>
            <div className="flex flex-col justify-end flex-none w-auto h-auto relative whitespace-pre">
              <p className="text-[12px] text-black text-right uppercase leading-[13.2px]">Lorem ipsum</p>
            </div>
            <div className="flex flex-col justify-end flex-none w-auto h-auto relative whitespace-pre">
              <p className="text-[12px] text-black text-right uppercase leading-[13.2px]">Praha</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
)

export const ListSlider = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  return (
    <div className="flex flex-col flex-none place-content-center items-center gap-12 w-full h-min p-0 relative overflow-hidden">
      <div className="aspect-[2.4] h-auto w-300 relative">
        <section className="flex flex-row w-full h-full max-w-full max-h-full place-items-center m-0 p-[0px_32px] list-none select-none">
          <div className="w-full h-full m-0 p-[inherit] absolute inset-0 overflow-visible border-0 select-none perspective-distant">
            <ul
              className="flex flex-row w-full h-full max-w-full max-h-full place-items-center m-0 p-0 list-none gap-4"
              style={{
                transform: 'translateX(0px)', // animated
              }}
            >
              {data.map((_, index) => (
                <ListSliderItem key={index.toString()} />
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
