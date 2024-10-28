import mongoose from 'mongoose'

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    interest: {
      type: String,
      required: false,
    },
    consultant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultant',
      required: false,
    },
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

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema)
