import { Container } from "../../components/container";

export default function Home() {
  return(
    <Container>
      <section className="w-full flex mx-auto justify-between items-center max-w-4xl bg-white rounded-lg">
        <input 
          className="p-2 h-8 outline-none w-full"
          placeholder="Digite o nome do carro..."
        />
        <button className="p-2 text-gray-800">
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center my-4 text-zinc-400">Carros novos e usados em todo o Brasil</h1>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <section className="w-full bg-white rounded-xl p-2">
          <img
            className="rounded-md w-full mb-2 max-h-72 hover:scale-105 transition-all z-10"
            src="https://cdn.motor1.com/images/mgl/JOx2BK/s3/avaliacao-fiat-strada-ranch-1.0-t200-cvt-2024-em-movimento-dianteira.webp" 
            alt="img-carro" />

          <p className="font-bold mt-1 mb-2 px-2">Fiat Toro </p>
          
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano: 2021/22 | 32000km</span>
            <strong className="text-black text-xl">R$ 120.000</strong>
          </div>
          <div className="w-full h-px bg-slate-300 my-2"></div>
          <div className="px-2 text-zinc-800">
            <span>São Paulo | Campinas-SP</span>
          </div>
        </section>

        <section className="w-full bg-white rounded-xl p-2">
          <img
            className="rounded-md w-full mb-2 max-h-72 hover:scale-105 transition-all"
            src="https://cdn.motor1.com/images/mgl/JOx2BK/s3/avaliacao-fiat-strada-ranch-1.0-t200-cvt-2024-em-movimento-dianteira.webp" 
            alt="img-carro" />

          <p className="font-bold mt-1 mb-2 px-2">Fiat Toro </p>
          
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano: 2021/22 | 32000km</span>
            <strong className="text-black text-xl">R$ 120.000</strong>
          </div>
          <div className="w-full h-px bg-slate-300 my-2"></div>
          <div className="px-2 text-zinc-800">
            <span>São Paulo | Campinas-SP</span>
          </div>
        </section>

        <section className="w-full bg-white rounded-xl p-2">
          <img
            className="rounded-md w-full mb-2 max-h-72 hover:scale-105 transition-all"
            src="https://cdn.motor1.com/images/mgl/JOx2BK/s3/avaliacao-fiat-strada-ranch-1.0-t200-cvt-2024-em-movimento-dianteira.webp" 
            alt="img-carro" />

          <p className="font-bold mt-1 mb-2 px-2">Fiat Toro </p>
          
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano: 2021/22 | 32000km</span>
            <strong className="text-black text-xl">R$ 120.000</strong>
          </div>
          <div className="w-full h-px bg-slate-300 my-2"></div>
          <div className="px-2 text-zinc-800">
            <span>São Paulo | Campinas-SP</span>
          </div>
        </section>
        
      </main>

    </Container>
  )
}