import express from 'express';
import mongoose from 'mongoose';
import { json } from 'express';
import jwt from 'jsonwebtoken';
import { FoundingCitizen } from './models/FoundingCitizen';
import { Admin } from './models/Admin';

const app = express();
app.use(json());

const MONGODB_URI = 'mongodb+srv://tavonia:4lwdAcgKGt0YBZEp@serverlessinstance0.rig1tiu.mongodb.net/?retryWrites=true&w=majority&appName=ServerlessInstance0';
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Admin login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit founding citizen application
app.post('/api/founding-citizen', async (req, res) => {
  try {
    const application = new FoundingCitizen(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application' });
  }
});

// Get all founding citizen applications (admin only)
app.get('/api/founding-citizens', authenticateToken, async (req, res) => {
  try {
    const applications = await FoundingCitizen.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Update application status (admin only)
app.patch('/api/founding-citizen/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const application = await FoundingCitizen.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});