import mongoose from 'mongoose'

const VehiclesSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['CARRO', 'MOTO'],
      required: true,
    },
    primaryImage: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    modelYear: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
    },
    itens: {
      type: [String],
      default: [],
    },
    km: {
      type: Number,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    fuel: {
      type: String,
      enum: ['FLEX', 'GASOLINA', 'ETANOL', 'DIESEL'],
      required: true,
    },
    exchange: {
      type: String,
      enum: ['AUTOMÁTICO', 'SEMI-AUTOMÁTICO', 'MANUAL'],
      required: true,
    },
    singleOwner: {
      type: Boolean,
      required: true,
    },
    paidIPVA: {
      type: Boolean,
      required: true,
    },
    licensed: {
      type: Boolean,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    tank: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
    wheelbase: {
      type: String,
      required: true,
    },
    occupants: {
      type: String,
      required: true,
    },
    trunk: {
      type: String,
      required: true,
    },
    accessCount: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    homePage: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models?.Vehicle ||
  mongoose.model('Vehicle', VehiclesSchema)
