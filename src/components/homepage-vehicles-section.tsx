import { getHomePageVehicles } from '@/lib/actions/vehicles.action'
import { HomePageVehicles } from './homepage-vehicles'

export async function HomePageVehiclesSection() {
  let vehicles: Awaited<ReturnType<typeof getHomePageVehicles>> = []

  try {
    vehicles = await getHomePageVehicles()
  } catch (error) {
    console.error('Error fetching home page vehicles:', error)
  }

  return <HomePageVehicles initialVehicles={vehicles} />
}
