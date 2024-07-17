import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/database';
import billRoutes from './routes/billRoutes';
import branchRoutes from './routes/branchRoutes';
import productRoutes from './routes/productRoutes';
import roleRoutes from './routes/roleRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bills', billRoutes);

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
