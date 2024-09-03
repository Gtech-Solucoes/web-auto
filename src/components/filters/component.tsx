/**
 * v0 by Vercel.
 * @see https://v0.dev/t/z0SNbthbHJj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ComponentForm() {
  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Fale com o vendedor</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Nome
          </label>
          <Input id="name" placeholder="Nome" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <Input id="email" placeholder="Email" type="email" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Telefone
          </label>
          <Input id="phone" placeholder="Telefone" />
        </div>
        <div className="mb-4">
          <span className="text-sm font-medium">Gostaria de (opcional):</span>
          <div className="flex items-center mt-2">
            <Checkbox id="trade-in" />
            <label className="ml-2 text-sm" htmlFor="trade-in">
              Dar minha moto na troca
            </label>
          </div>
          <div className="flex items-center mt-2">
            <Checkbox id="finance" />
            <label className="ml-2 text-sm" htmlFor="finance">
              Financiar
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="message">
            Mensagem pré definida
          </label>
          <Textarea
            defaultValue="Olá, tenho interesse no veículo Honda CB 300R. Gostaria de receber mais informações sobre a moto. Poderia entrar em contato?"
            id="message"
            placeholder="Mensagem pré definida"
          />
        </div>
        <div className="flex items-center mb-4">
          <Checkbox defaultChecked id="offers" />
          <label className="ml-2 text-sm" htmlFor="offers">
            Receber ofertas e promoções
          </label>
        </div>
        <Button className="w-full">Enviar Mensagem</Button>
      </form>
    </div>
  )
}
