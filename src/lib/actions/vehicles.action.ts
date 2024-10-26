'use server'

import vehiclesModel from '../models/vehicles.model'
import { connectToDB } from '../moongose'

export type Vehicle = {
  id: string
  type: 'CARRO' | 'MOTO'
  primaryImage: string
  images: string[]
  brand: string
  model: string
  year: string
  description: string
  price: string
  modelYear: string
  about?: string
  itens: string[]
  km: string
  body: string
  color: string
  fuel: 'FLEX' | 'GASOLINA' | 'ETANOL' | 'DIESEL'
  exchange: 'AUTOMÁTICO' | 'SEMI-AUTOMÁTICO' | 'MANUAL'
  singleOwner: boolean
  paidIPVA: boolean
  licensed: boolean
  width: string
  height: string
  weight: string
  tank: string
  length: string
  wheelbase: string
  occupants: string
  trunk: string
  accessCount?: string
  status: string
  homePage?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export const getHomePageVehicles = async (): Promise<Partial<Vehicle>[]> => {
  await connectToDB()

  const vehicles = await vehiclesModel
    .find({
      where: {
        homePage: true,
      },
    })
    .exec()

  const data = vehicles?.map((vehicle) => {
    return {
      id: vehicle._id.toString(),
      images: vehicle.images,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      description: vehicle.description,
      status: vehicle.status,
      modelYear: vehicle.modelYear,
      about: vehicle.about,
      itens: vehicle.itens,
      km: vehicle.km,
      fuel: vehicle.fuel,
      exchange: vehicle.exchange,
      singleOwner: vehicle.singleOwner,
      paidIPVA: vehicle.paidIPVA,
      licensed: vehicle.licensed,
      accessCount: vehicle?.accessCount || 0,
    }
  })

  return data
}

export const getVehicleById = async (id: string): Promise<Vehicle | null> => {
  await connectToDB()

  const vehicle = await vehiclesModel.findById(id).exec()

  if (!vehicle) {
    return null
  }

  return {
    id: vehicle._id.toString(),
    type: vehicle.type,
    primaryImage: vehicle.primaryImage,
    images: vehicle.images,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    description: vehicle.description,
    price: vehicle.price,
    modelYear: vehicle.modelYear,
    about: vehicle.about,
    itens: vehicle.itens,
    km: vehicle.km,
    body: vehicle.body,
    color: vehicle.color,
    fuel: vehicle.fuel,
    exchange: vehicle.exchange,
    singleOwner: vehicle.singleOwner,
    paidIPVA: vehicle.paidIPVA,
    licensed: vehicle.licensed,
    width: vehicle.width,
    height: vehicle.height,
    weight: vehicle.weight,
    tank: vehicle.tank,
    length: vehicle.length,
    wheelbase: vehicle.wheelbase,
    occupants: vehicle.occupants,
    trunk: vehicle.trunk,
    accessCount: vehicle.accessCount,
    status: vehicle.status,
    homePage: vehicle.homePage,
    createdAt: new Date(vehicle.createdAt),
    updatedAt: new Date(vehicle.updatedAt),
  }
}
