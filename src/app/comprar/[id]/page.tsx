import {
  Dashboard,
  DashboardContent,
  DashboardHeader,
} from '@/components/dashboard/dashboard'
import {
  SideBar,
  SideBarContent,
  SideBarHeader,
} from '@/components/dashboard/sidebar/sidebar'
import { Navigation } from '@/components/navigation/navigation'
import { NavigationMobile } from '@/components/navigation/navigation-mobile'
import { Car } from 'lucide-react'
import Link from 'next/link'

export default function Datail() {
  return (
    <Dashboard>
      <SideBar>
        <SideBarContent>
          <SideBarHeader>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Car className="h-6 w-6" />
              <span>Logo Veículos</span>
            </Link>
          </SideBarHeader>
        </SideBarContent>
      </SideBar>
      <DashboardContent>
        <DashboardHeader>
          <Navigation />
          <NavigationMobile />
        </DashboardHeader>
      </DashboardContent>
    </Dashboard>
  )
}
