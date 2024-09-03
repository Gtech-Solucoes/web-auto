import { Navigation } from '../navigation/navigation'

export function Header() {
  return (
    <div className="flex items-center px-5 py-2 border-b">
      <h1 className="font-bold text-lg w-[250px]">NORTH BENS VEICULOS</h1>
      <div className="flex w-full items-center justify-center">
        <Navigation />
      </div>
    </div>
  )
}
