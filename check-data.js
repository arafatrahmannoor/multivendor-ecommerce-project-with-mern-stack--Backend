/* eslint-env node */
import mongoose from 'mongoose';
import Product from './model/product.js';
import Category from './model/category.js';
import User from './model/user.js';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;

async function checkDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        
        // Check collections
        const productCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();
        const userCount = await User.countDocuments();
        
        console.log(`📦 Products: ${productCount}`);
        console.log(`📁 Categories: ${categoryCount}`);
        console.log(`👥 Users: ${userCount}`);
        
        // Get sample products
        if (productCount > 0) {
            const sampleProducts = await Product.find().limit(3);
            console.log('\n📝 Sample Products:');
            sampleProducts.forEach(product => {
                console.log(`- ${product.name} ($${product.price})`);
            });
        } else {
            console.log('\n⚠️  No products found in database');
        }
        
        // Get sample categories
        if (categoryCount > 0) {
            const sampleCategories = await Category.find().limit(3);
            console.log('\n📝 Sample Categories:');
            sampleCategories.forEach(category => {
                console.log(`- ${category.name}`);
            });
        } else {
            console.log('\n⚠️  No categories found in database');
        }
        
        await mongoose.disconnect();
        console.log('\n✅ Database check complete');
        
    } catch (error) {
        console.error('❌ Database check failed:', error.message);
        process.exit(1);
    }
}

checkDatabase();
