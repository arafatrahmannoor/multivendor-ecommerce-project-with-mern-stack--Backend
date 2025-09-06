/* eslint-env node */
/* global process */
import 'dotenv/config';

console.log('1. Loading environment...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);

console.log('2. Importing mongoose...');
import mongoose from 'mongoose';

console.log('3. Importing app...');
import app from './app.js';

console.log('4. Importing ensureAdmin...');
import ensureAdmin from './utils/ensureAdmin.js';

console.log('5. Setting up variables...');
const MONGODB_URI = process.env.MONGODB_URI;
const BASE_PORT = Number(process.env.PORT) || 3000;

console.log('6. Starting server...');

async function startServer() {
    try {
        console.log('6a. Connecting to database...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        
        console.log('6b. Seeding admin...');
        await ensureAdmin();
        console.log('✅ Admin seeding completed');
        
        console.log('6c. Starting HTTP server...');
        const server = app.listen(BASE_PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${BASE_PORT}`);
        });
        
        server.on('error', (err) => {
            console.error('Server error:', err);
        });
        
    } catch (error) {
        console.error('Startup error:', error);
        process.exit(1);
    }
}

console.log('7. Calling startServer...');
startServer();
