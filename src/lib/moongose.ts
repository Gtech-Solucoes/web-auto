import mongoose from 'mongoose'

let isConnected = false // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL) return

  if (isConnected) {
    console.log('isConnected', isConnected)
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL)

    isConnected = true
  } catch (error) {}
}
