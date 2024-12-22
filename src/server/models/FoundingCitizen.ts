import mongoose from 'mongoose';

const foundingCitizenSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
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

export const FoundingCitizen = mongoose.model('FoundingCitizen', foundingCitizenSchema);