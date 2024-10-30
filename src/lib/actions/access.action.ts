'use server'

import { connectToDB } from '../moongose'
import Access from '../models/access.model'
import vehiclesModel from '../models/vehicles.model'
import mongoose from 'mongoose'

export const addAccess = async (id: string) => {
  console.log('id', id)
  await connectToDB()

  try {
    const access = new Access({
      vehicle: new mongoose.Types.ObjectId(id),
    })

    await access.save()

    const vehicle = await vehiclesModel.findById(id)

    if (vehicle) {
      await vehiclesModel.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        {
          $set: {
            accessCount: (vehicle.accessCount || 0) + 1,
          },
        },
      )
    }
  } catch (error) {
    console.log('error', error)
  }
}
