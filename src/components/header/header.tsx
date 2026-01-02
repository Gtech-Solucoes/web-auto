import { Navigation } from '../navigation/navigation'
import { siteConfig } from '@/lib/site-config'

export function Header() {
  return (
    <div className="flex items-center px-5 py-2 border-b">
      <h1 className="font-bold text-lg w-[250px]">
        {siteConfig.accountName}
      </h1>
      <div className="flex w-full items-center justify-center">
        <Navigation />
      </div>
    </div>
  )
}
