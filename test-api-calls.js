/* eslint-env node */
import axios from 'axios';

async function testAPI() {
    try {
        console.log('🧪 Testing API endpoints...\n');
        
        // Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthResponse = await axios.get('http://localhost:3001/api/health');
        console.log('✅ Health:', healthResponse.data);
        
        // Test products endpoint
        console.log('\n2. Testing products endpoint...');
        const productsResponse = await axios.get('http://localhost:3001/api/products');
        console.log('✅ Products count:', productsResponse.data.count);
        
        if (productsResponse.data.products && productsResponse.data.products.length > 0) {
            console.log('📦 First product:', {
                name: productsResponse.data.products[0].name,
                price: productsResponse.data.products[0].price,
                category: productsResponse.data.products[0].category
            });
        }
        
        console.log('\n🎉 All API tests passed!');
        
    } catch (error) {
        console.error('❌ API test failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testAPI();
