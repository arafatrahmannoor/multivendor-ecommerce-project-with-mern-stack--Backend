const axios = require('axios');

const BASE_URL = 'http://localhost:3002/api';

async function testAuth() {
    try {
        console.log('🔐 Testing Authentication...\n');
        console.log('Attempting to connect to:', `${BASE_URL}/auth/login`);
        console.log('Using credentials:', { email: 'test@example.com', password: 'test123' });
        
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'test@example.com',
            password: 'test123'
        }, {
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Login successful!');
        console.log('Token:', response.data.token?.substring(0, 20) + '...');
        console.log('User:', response.data.user?.name);
        console.log('User ID:', response.data.user?._id);
        
    } catch (error) {
        console.log('❌ Login failed:');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
            console.log('Headers:', error.response.headers);
        } else if (error.request) {
            console.log('No response received');
            console.log('Request error:', error.message);
        } else {
            console.log('Error setting up request:', error.message);
        }
        console.log('Full error:', error.code);
    }
}

testAuth();
