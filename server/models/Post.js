import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    category: {
      type: String,
      enum: ['Workshops', 'Career', 'Clubs', 'Sports'],
    },
    date: { type: Date, required: true },
    location: { type: String, trim: true },
    description: { type: String, required: true, minlength: 20 },
    image: { type: String },
    rsvpLimit: { type: Number, min: 1 },
    status: { type: String, enum: ['published', 'draft'], default: 'draft' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Post', postSchema)
