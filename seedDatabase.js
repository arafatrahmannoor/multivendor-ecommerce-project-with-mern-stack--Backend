/* eslint-env node */
/* global process */
import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './model/product.js';
import Category from './model/category.js';
import Brand from './model/brand.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Create sample category
        const category = await Category.findOneAndUpdate(
            { name: 'Electronics' },
            { 
                name: 'Electronics', 
                description: 'Electronic devices and gadgets',
                slug: 'electronics'
            },
            { upsert: true, new: true }
        );

        // Create sample brand
        const brand = await Brand.findOneAndUpdate(
            { name: 'TechBrand' },
            { 
                name: 'TechBrand', 
                description: 'Leading technology brand',
                slug: 'techbrand'
            },
            { upsert: true, new: true }
        );

        // Create sample products
        const sampleProducts = [
            {
                name: 'Smartphone Pro',
                description: 'Latest smartphone with advanced features',
                price: 699,
                category: category._id,
                brand: brand._id,
                stock: 50,
                slug: 'smartphone-pro',
                images: [],
                isActive: true
            },
            {
                name: 'Laptop Gaming',
                description: 'High-performance gaming laptop',
                price: 1299,
                category: category._id,
                brand: brand._id,
                stock: 25,
                slug: 'laptop-gaming',
                images: [],
                isActive: true
            },
            {
                name: 'Wireless Headphones',
                description: 'Premium wireless headphones with noise cancellation',
                price: 199,
                category: category._id,
                brand: brand._id,
                stock: 100,
                slug: 'wireless-headphones',
                images: [],
                isActive: true
            }
        ];

        for (const productData of sampleProducts) {
            await Product.findOneAndUpdate(
                { slug: productData.slug },
                productData,
                { upsert: true, new: true }
            );
        }

        console.log('✅ Sample data seeded successfully!');
        console.log(`Created/updated ${sampleProducts.length} products`);
        
        // Count existing products
        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalBrands = await Brand.countDocuments();
        
        console.log(`Database now has:`);
        console.log(`- ${totalProducts} products`);
        console.log(`- ${totalCategories} categories`);
        console.log(`- ${totalBrands} brands`);

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

seedDatabase();
