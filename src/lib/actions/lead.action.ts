'use server'

import { apiFetch } from './api'

export type AddLeadInput = {
  name: string
  phone: string
  message: string
  interest: string
  consultant?: string
  vehicle?: string
}

export const addLead = async (input: AddLeadInput) => {
  const response = await apiFetch('/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: input.name,
      phone: input.phone,
      message: input.message,
      interest: input.interest,
      vehicleId: input.vehicle,
    }),
  })

  if (!response.ok) {
    throw new Error('Error creating lead')
  }
}
