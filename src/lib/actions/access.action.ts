'use server'

import { connectToDB } from '../moongose'
import Access from '../models/access.model'
import mongoose from 'mongoose'

export const addAccess = async (id: string) => {
  await connectToDB()

  try {
    const access = new Access({
      vehicle: new mongoose.Types.ObjectId(id),
    })

    await access.save()
  } catch (error) {
    console.log('error', error)
  }
}
