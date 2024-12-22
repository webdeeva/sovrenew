import express from 'express';
import mongoose from 'mongoose';
import { json } from 'express';
import jwt from 'jsonwebtoken';
import { FoundingCitizen } from './models/FoundingCitizen';
import { Admin } from './models/Admin';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));
app.use(json());
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://tavonia:4lwdAcgKGt0YBZEp@serverlessinstance0.rig1tiu.mongodb.net/?retryWrites=true&w=majority&appName=ServerlessInstance0';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

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

// Error handling middleware
const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: err.message || 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err : undefined
  });
};

// Admin login
app.post('/api/admin/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username });

    const admin = await Admin.findOne({ username });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

// Submit founding citizen application
app.post('/api/founding-citizen', async (req, res, next) => {
  try {
    console.log('Received application:', req.body);
    const application = new FoundingCitizen(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (error: any) {
    console.error('Application submission error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already registered' });
    } else {
      next(error);
    }
  }
});

// Get all founding citizen applications (admin only)
app.get('/api/founding-citizens', authenticateToken, async (req, res, next) => {
  try {
    const applications = await FoundingCitizen.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    next(error);
  }
});

// Update application status (admin only)
app.patch('/api/founding-citizen/:id', authenticateToken, async (req, res, next) => {
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
    next(error);
  }
});

// Apply error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only start the server if this file is being run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;