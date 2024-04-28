import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'WebAuto',
  description: 'Veículos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen h-screen max-h-screen bg-background antialiased ',
          poppins.className,
        )}
      >
        {children}
      </body>
    </html>
  )
}
