const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testEndpointsDetailed() {
    try {
        console.log('🔍 Detailed API Endpoint Testing\n');
        
        // Test products with different parameters
        console.log('📦 Testing Products endpoint variations...');
        
        // Test 1: Get all products without filters
        try {
            const response1 = await axios.get(`${BASE_URL}/products`);
            console.log('✅ /products (default):', response1.data.success ? 'Success' : 'Failed');
            console.log('   Products:', response1.data.products?.length || 0);
            console.log('   Response keys:', Object.keys(response1.data));
        } catch (error) {
            console.log('❌ /products (default):', error.response?.status, error.response?.data?.message);
        }
        
        // Test 2: Get products with explicit status
        try {
            const response2 = await axios.get(`${BASE_URL}/products?status=active`);
            console.log('✅ /products?status=active:', response2.data.success ? 'Success' : 'Failed');
            console.log('   Products:', response2.data.products?.length || 0);
        } catch (error) {
            console.log('❌ /products?status=active:', error.response?.status, error.response?.data?.message);
        }
        
        // Test 3: Get products with higher limit
        try {
            const response3 = await axios.get(`${BASE_URL}/products?limit=50`);
            console.log('✅ /products?limit=50:', response3.data.success ? 'Success' : 'Failed');
            console.log('   Products:', response3.data.products?.length || 0);
        } catch (error) {
            console.log('❌ /products?limit=50:', error.response?.status, error.response?.data?.message);
        }
        
        // Test categories
        console.log('\n📁 Testing Categories endpoint variations...');
        
        try {
            const response = await axios.get(`${BASE_URL}/categories`);
            console.log('✅ /categories:', response.data.success ? 'Success' : 'Failed');
            console.log('   Categories:', response.data.categories?.length || 0);
            console.log('   Response keys:', Object.keys(response.data));
        } catch (error) {
            console.log('❌ /categories:', error.response?.status, error.response?.data?.message);
        }
        
        // Test with isActive parameter
        try {
            const response = await axios.get(`${BASE_URL}/categories?isActive=true`);
            console.log('✅ /categories?isActive=true:', response.data.success ? 'Success' : 'Failed');
            console.log('   Categories:', response.data.categories?.length || 0);
        } catch (error) {
            console.log('❌ /categories?isActive=true:', error.response?.status, error.response?.data?.message);
        }
        
        // Test brands
        console.log('\n🏷️ Testing Brands endpoint variations...');
        
        try {
            const response = await axios.get(`${BASE_URL}/brands`);
            console.log('✅ /brands:', response.data.success ? 'Success' : 'Failed');
            console.log('   Brands:', response.data.brands?.length || 0);
            console.log('   Response keys:', Object.keys(response.data));
        } catch (error) {
            console.log('❌ /brands:', error.response?.status, error.response?.data?.message);
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testEndpointsDetailed();
