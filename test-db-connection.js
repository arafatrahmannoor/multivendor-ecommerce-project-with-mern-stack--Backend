const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        console.log('🔌 Testing MongoDB connection...');
        console.log('URI:', process.env.MONGODB_URI);
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected successfully');
        
        // Test collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`📊 Database has ${collections.length} collections:`);
        collections.forEach(col => console.log(`  - ${col.name}`));
        
        await mongoose.disconnect();
        console.log('🔌 Connection closed');
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();
