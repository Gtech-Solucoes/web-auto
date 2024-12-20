import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import wpIcon from '../../public/assets/whatsapp.svg'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Footer } from '@/components/dashboard/footer'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title:
    'North Bens Veículos | Carros Usados e Seminovos em São José do Rio Preto',
  description:
    'Carros usados e seminovos em São José do Rio Preto e região. Encontre veículos de qualidade e ótimos preços em nossa plataforma. Confira agora!',
  openGraph: {
    images:
      'https://utfs.io/f/wS9TazsQMP5sVd9hJyQMFktpqf8OLsWCQn5ZR0GU7TYEaPKl',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <script
        defer
        data-domain="northbensveiculos.com.br"
        src="https://analytics.gtechsoftwares.com.br/js/script.js"
      ></script>
      <body
        className={cn(
          'min-h-screen bg-background antialiased overflow-x-hidden',
          poppins.className,
        )}
      >
        {children}
        <Footer />
        <div className="fixed bottom-6 right-6 float-right w-12 h-12 flex justify-center cursor-pointer items-center bg-green-500 rounded-full ">
          <a
            href="https://api.whatsapp.com/send?phone=5517988034098&text=Ol%C3%A1%20gostaria%20de%20vender%20ou%20trocar%20meu%20carro.%0APode%20me%20ajudar%3F"
            target="_blank"
          >
            <img
              src="https://northbensveiculos.com.br/assets/whatsapp.svg"
              width={28}
              height={28}
              alt="WhatsApp Icon"
            />
          </a>
        </div>
      </body>
    </html>
  )
}
