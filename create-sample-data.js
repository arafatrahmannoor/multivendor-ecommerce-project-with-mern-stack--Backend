const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Category = require('./model/category');
const Brand = require('./model/brand'); 
const Product = require('./model/product');
const User = require('./model/user');

async function createSampleData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🔌 Connected to MongoDB');
        
        // Check if data already exists
        const categoryCount = await Category.countDocuments();
        const brandCount = await Brand.countDocuments();
        const productCount = await Product.countDocuments();
        
        console.log(`📊 Current data: ${categoryCount} categories, ${brandCount} brands, ${productCount} products`);
        
        if (categoryCount === 0) {
            console.log('📁 Creating sample categories...');
            const categories = await Category.insertMany([
                { name: 'Electronics', description: 'Electronic devices and gadgets' },
                { name: 'Clothing', description: 'Fashion and apparel' },
                { name: 'Books', description: 'Books and educational materials' },
                { name: 'Home & Garden', description: 'Home improvement and garden supplies' }
            ]);
            console.log(`✅ Created ${categories.length} categories`);
        }
        
        if (brandCount === 0) {
            console.log('🏷️ Creating sample brands...');
            const brands = await Brand.insertMany([
                { name: 'TechCorp', description: 'Leading technology brand' },
                { name: 'FashionHub', description: 'Premium fashion brand' },
                { name: 'BookWise', description: 'Educational publishers' },
                { name: 'HomeStyle', description: 'Home and garden specialists' }
            ]);
            console.log(`✅ Created ${brands.length} brands`);
        }
        
        if (productCount === 0) {
            console.log('📦 Creating sample products...');
            
            // Get created categories and brands
            const categories = await Category.find();
            const brands = await Brand.find();
            const user = await User.findOne(); // Get a vendor user
            
            if (categories.length > 0 && brands.length > 0) {
                const products = await Product.insertMany([
                    {
                        name: 'Smartphone Pro',
                        description: 'Latest smartphone with advanced features',
                        price: 699.99,
                        category: categories[0]._id,
                        brand: brands[0]._id,
                        vendor: user?._id,
                        images: ['electronics/smartphone.jpg'],
                        inventory: { quantity: 50, trackQuantity: true },
                        status: 'active'
                    },
                    {
                        name: 'Designer T-Shirt',
                        description: 'Premium cotton t-shirt with modern design',
                        price: 29.99,
                        category: categories[1]._id,
                        brand: brands[1]._id,
                        vendor: user?._id,
                        images: ['clothing/tshirt.jpg'],
                        inventory: { quantity: 100, trackQuantity: true },
                        status: 'active'
                    },
                    {
                        name: 'Programming Book',
                        description: 'Complete guide to modern web development',
                        price: 49.99,
                        category: categories[2]._id,
                        brand: brands[2]._id,
                        vendor: user?._id,
                        images: ['books/programming.jpg'],
                        inventory: { quantity: 25, trackQuantity: true },
                        status: 'active'
                    }
                ]);
                console.log(`✅ Created ${products.length} products`);
            }
        }
        
        // Final count
        const finalCategoryCount = await Category.countDocuments();
        const finalBrandCount = await Brand.countDocuments();
        const finalProductCount = await Product.countDocuments();
        
        console.log(`\n📊 Final data: ${finalCategoryCount} categories, ${finalBrandCount} brands, ${finalProductCount} products`);
        console.log('🎉 Sample data setup complete!');
        
        await mongoose.disconnect();
        
    } catch (error) {
        console.error('❌ Error creating sample data:', error);
    }
}

createSampleData();
