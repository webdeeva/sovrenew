import mongoose from 'mongoose';

const foundingCitizenSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  cityState: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes
foundingCitizenSchema.index({ email: 1 }, { unique: true });
foundingCitizenSchema.index({ createdAt: -1 });

export const FoundingCitizen = mongoose.model('FoundingCitizen', foundingCitizenSchema);