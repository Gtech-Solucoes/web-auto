'use server'

import { connectToDB } from '../moongose'
import Lead from '../models/lead.model'

export type AddLeadInput = {
  name: string
  phone: string
  message: string
  interest: string
  consultant?: string
  vehicle?: string
}

export const addLead = async (input: AddLeadInput) => {
  await connectToDB()

  const newLead = new Lead({
    name: input.name,
    phone: input.phone,
    message: input.message,
    interest: input.interest,
    consultant: input.consultant,
    vehicle: input.vehicle,
  })

  await newLead.save()
}
