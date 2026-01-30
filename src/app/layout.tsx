import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'
import { Footer } from '@/components/dashboard/footer'
import { siteConfig, siteLinks } from '@/lib/site-config'
import { defaultMetadata } from '@/lib/seo-config'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = defaultMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      {siteConfig.analyticsDomain && siteConfig.analyticsScriptUrl && (
        <script
          defer
          data-domain={siteConfig.analyticsDomain}
          src={siteConfig.analyticsScriptUrl}
        ></script>
      )}
      <body
        className={cn(
          'min-h-screen bg-background antialiased overflow-x-hidden',
          poppins.className,
        )}
      >
        {children}
        <Footer />
        {siteLinks.whatsappDefault && (
          <div className="fixed bottom-6 right-6 float-right w-12 h-12 flex justify-center cursor-pointer items-center bg-green-500 rounded-full ">
            <a href={siteLinks.whatsappDefault} target="_blank">
              <img
                src={siteConfig.whatsappIconUrl}
                width={28}
                height={28}
                alt="WhatsApp Icon"
              />
            </a>
          </div>
        )}
      </body>
    </html>
  )
}
