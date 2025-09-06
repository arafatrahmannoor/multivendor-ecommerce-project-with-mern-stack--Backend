/* eslint-env node */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Product from './model/product.js';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Simple API routes
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category', 'name')
            .populate('brand', 'name')
            .limit(10);
        
        res.json({
            success: true,
            count: products.length,
            products: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category', 'name')
            .populate('brand', 'name');
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        res.json({
            success: true,
            product: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
});

const PORT = 3001; // Use different port to avoid conflicts
app.listen(PORT, () => {
    console.log(`🚀 Simple test server running on http://localhost:${PORT}`);
    console.log(`📋 Test endpoints:`);
    console.log(`   - GET http://localhost:${PORT}/api/health`);
    console.log(`   - GET http://localhost:${PORT}/api/products`);
    console.log(`   - GET http://localhost:${PORT}/api/products/:id`);
});
