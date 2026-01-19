'use server'

import { fetchApi } from './api'

export const addAccess = async (id: string) => {
  try {
    const response = await fetchApi('/access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vehicleId: id }),
    })

    if (!response.ok) {
      console.log('error', await response.text())
    }
  } catch (error) {
    console.log('error', error)
  }
}
