/* eslint-env node */
/* global process */
import 'dotenv/config';
import mongoose from 'mongoose';
import ensureAdmin from './utils/ensureAdmin.js';

console.log('Testing admin seeding...');

const MONGODB_URI = process.env.MONGODB_URI;

async function testAdminSeeding() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        
        console.log('Running ensureAdmin...');
        await ensureAdmin();
        console.log('✅ Admin seeding completed');
        
        await mongoose.disconnect();
        console.log('✅ Disconnected from MongoDB');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        console.error('Full error:', err);
        process.exit(1);
    }
}

testAdminSeeding();
