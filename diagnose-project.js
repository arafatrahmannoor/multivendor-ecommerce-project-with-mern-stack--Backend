/* eslint-env node */
import mongoose from 'mongoose';
import Product from './model/product.js';
import Category from './model/category.js';
import User from './model/user.js';
import 'dotenv/config';

async function diagnoseProject() {
    console.log('🔍 BACKEND PROJECT DIAGNOSIS\n');
    console.log('=' .repeat(50));
    
    try {
        // 1. Database Connection Test
        console.log('\n1. 📊 DATABASE CONNECTION');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('   ✅ MongoDB connection successful');
        
        // 2. Data Counts
        console.log('\n2. 📈 DATA ANALYSIS');
        const productCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();
        const userCount = await User.countDocuments();
        
        console.log(`   📦 Products: ${productCount}`);
        console.log(`   📁 Categories: ${categoryCount}`);
        console.log(`   👥 Users: ${userCount}`);
        
        // 3. Sample Product Analysis
        if (productCount > 0) {
            console.log('\n3. 🔍 PRODUCT ANALYSIS');
            const products = await Product.find()
                .populate('category', 'name')
                .populate('brand', 'name')
                .limit(3);
            
            products.forEach((product, index) => {
                console.log(`   ${index + 1}. ${product.name}`);
                console.log(`      💰 Price: $${product.price}`);
                console.log(`      📁 Category: ${product.category?.name || 'No category'}`);
                console.log(`      🏷️  Brand: ${product.brand?.name || 'No brand'}`);
                console.log(`      📸 Images: ${product.images?.length || 0}`);
                console.log(`      📊 Status: ${product.status}`);
                console.log('');
            });
        } else {
            console.log('\n3. ⚠️  NO PRODUCTS FOUND');
            console.log('   This explains why frontend cannot display products!');
        }
        
        // 4. Admin User Check
        console.log('\n4. 👨‍💼 ADMIN USER CHECK');
        const adminUser = await User.findOne({ role: 'admin' });
        if (adminUser) {
            console.log(`   ✅ Admin user exists: ${adminUser.email}`);
        } else {
            console.log('   ❌ No admin user found');
        }
        
        // 5. Category Analysis
        if (categoryCount > 0) {
            console.log('\n5. 📂 CATEGORY ANALYSIS');
            const categories = await Category.find().limit(5);
            categories.forEach(cat => {
                console.log(`   - ${cat.name} (${cat.status || 'no status'})`);
            });
        }
        
        // 6. Environment Variables Check
        console.log('\n6. 🔧 ENVIRONMENT VARIABLES');
        console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'}`);
        console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Missing'}`);
        console.log(`   PORT: ${process.env.PORT || '3000 (default)'}`);
        
        await mongoose.disconnect();
        
        console.log('\n' + '=' .repeat(50));
        console.log('🎯 DIAGNOSIS SUMMARY:');
        console.log(`   • Database: ${productCount > 0 ? 'Has data ✅' : 'Empty ⚠️'}`);
        console.log(`   • Products: ${productCount} items`);
        console.log(`   • Categories: ${categoryCount} items`);
        console.log(`   • Users: ${userCount} items`);
        console.log('=' .repeat(50));
        
        if (productCount === 0) {
            console.log('\n🚨 CRITICAL ISSUE FOUND:');
            console.log('   No products in database! This is why frontend shows empty.');
            console.log('   Need to seed sample data.');
        }
        
    } catch (error) {
        console.error('\n❌ DIAGNOSIS FAILED:', error.message);
    }
}

diagnoseProject();
