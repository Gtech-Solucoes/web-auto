import mongoose from 'mongoose'

const AccessSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models?.Access || mongoose.model('Access', AccessSchema)
