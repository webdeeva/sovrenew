import mongoose from 'mongoose';
import { Admin } from './models/Admin';

const MONGODB_URI = 'mongodb+srv://tavonia:4lwdAcgKGt0YBZEp@serverlessinstance0.rig1tiu.mongodb.net/?retryWrites=true&w=majority&appName=ServerlessInstance0';

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const adminData = {
      username: 'admin',
      password: 'SovStates2024!' // In production, use hashed passwords
    };

    const existingAdmin = await Admin.findOne({ username: adminData.username });
    
    if (!existingAdmin) {
      await Admin.create(adminData);
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

createAdmin();