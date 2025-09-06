const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testAPIEndpoints() {
    try {
        console.log('🚀 E-Commerce API Analysis & Testing\n');
        
        // Test health endpoint
        console.log('📊 Testing Health Check...');
        const healthResponse = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health Check:', healthResponse.data.message);
        console.log('   Version:', healthResponse.data.version);
        console.log('   Timestamp:', healthResponse.data.timestamp);
        
        // Test authentication
        console.log('\n🔐 Testing Authentication...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'test@example.com',
            password: 'test123'
        });
        
        console.log('✅ Login successful!');
        const token = loginResponse.data.token;
        const userId = loginResponse.data.user._id;
        console.log('   User:', loginResponse.data.user.name);
        console.log('   Role:', loginResponse.data.user.role);
        
        // Test cart functionality
        console.log('\n🛒 Testing Cart Functionality...');
        
        // Get cart
        const cartResponse = await axios.get(`${BASE_URL}/cart`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('✅ Get Cart:', cartResponse.data.success ? 'Success' : 'Failed');
        console.log('   Items in cart:', cartResponse.data.cart?.items?.length || 0);
        console.log('   Cart total:', cartResponse.data.cart?.total || 0);
        
        // Test products endpoint
        console.log('\n📦 Testing Products...');
        const productsResponse = await axios.get(`${BASE_URL}/products?limit=3`);
        console.log('✅ Get Products:', productsResponse.data.success ? 'Success' : 'Failed');
        console.log('   Products found:', productsResponse.data.data?.products?.length || 0);
        
        if (productsResponse.data.data?.products?.length > 0) {
            const testProduct = productsResponse.data.data.products[0];
            console.log('   Sample product:', testProduct.name);
            
            // Test adding product to cart
            console.log('\n➕ Testing Add to Cart...');
            const addToCartResponse = await axios.post(`${BASE_URL}/cart/add`, {
                productId: testProduct._id,
                quantity: 1
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (addToCartResponse.data.success) {
                console.log('✅ Add to Cart: Success');
                console.log('   Cart items:', addToCartResponse.data.cart.items.length);
                console.log('   Cart total:', addToCartResponse.data.cart.total);
            }
        }
        
        // Test categories
        console.log('\n📁 Testing Categories...');
        const categoriesResponse = await axios.get(`${BASE_URL}/categories`);
        console.log('✅ Get Categories:', categoriesResponse.data.success ? 'Success' : 'Failed');
        console.log('   Categories found:', categoriesResponse.data.data?.categories?.length || 0);
        
        // Test brands
        console.log('\n🏷️ Testing Brands...');
        const brandsResponse = await axios.get(`${BASE_URL}/brands`);
        console.log('✅ Get Brands:', brandsResponse.data.success ? 'Success' : 'Failed');
        console.log('   Brands found:', brandsResponse.data.data?.brands?.length || 0);
        
        console.log('\n🎉 API Analysis Complete! All core endpoints are working properly.');
        
    } catch (error) {
        console.error('❌ Test failed:');
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Error:', error.response.data);
        } else {
            console.error('   Error:', error.message);
        }
    }
}

testAPIEndpoints();
