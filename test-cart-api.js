const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test user credentials (you'll need to replace with actual test user)
const TEST_USER = {
    email: 'test@example.com',
    password: 'test123'
};

let authToken = '';
let testProductId = '';
let cartItemId = '';

async function runCartAPITests() {
    try {
        console.log('🚀 Cart API Integration Tests\n');

        // Step 1: Login to get auth token
        console.log('🔐 Step 1: User Authentication');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, TEST_USER);
        authToken = loginResponse.data.token;
        console.log('✅ Login successful');

        const headers = { Authorization: `Bearer ${authToken}` };

        // Step 2: Get a product for testing
        console.log('\n📦 Step 2: Get Test Product');
        const productsResponse = await axios.get(`${BASE_URL}/products`);
        testProductId = productsResponse.data.data.products[0]._id;
        console.log(`✅ Test product ID: ${testProductId}`);

        // Step 3: Get initial cart
        console.log('\n🛒 Step 3: Get Initial Cart');
        const initialCartResponse = await axios.get(`${BASE_URL}/cart`, { headers });
        console.log('✅ Initial cart retrieved');
        console.log(`📊 Items: ${initialCartResponse.data.data.summary.itemCount}, Total: $${initialCartResponse.data.data.summary.total}`);

        // Step 4: Add item to cart
        console.log('\n➕ Step 4: Add Item to Cart');
        const addResponse = await axios.post(`${BASE_URL}/cart/add`, {
            productId: testProductId,
            quantity: 2,
            variant: { color: 'Black', size: 'Medium' }
        }, { headers });
        console.log('✅ Item added to cart');
        console.log(`📊 Items: ${addResponse.data.data.summary.itemCount}, Total: $${addResponse.data.data.summary.total}`);
        cartItemId = addResponse.data.data.cart.items[0]._id;

        // Step 5: Get cart summary
        console.log('\n📊 Step 5: Get Cart Summary');
        const summaryResponse = await axios.get(`${BASE_URL}/cart/summary`, { headers });
        console.log('✅ Cart summary retrieved');
        console.log(`📊 Items: ${summaryResponse.data.data.itemCount}, Total: $${summaryResponse.data.data.total}`);

        // Step 6: Check if product is in cart
        console.log('\n🔍 Step 6: Check Product in Cart');
        const checkResponse = await axios.get(`${BASE_URL}/cart/check/${testProductId}`, { headers });
        console.log('✅ Product check completed');
        console.log(`📊 In Cart: ${checkResponse.data.data.inCart}, Quantity: ${checkResponse.data.data.quantity}`);

        // Step 7: Update cart item quantity
        console.log('\n📝 Step 7: Update Cart Item');
        const updateResponse = await axios.put(`${BASE_URL}/cart/update/${cartItemId}`, {
            quantity: 3
        }, { headers });
        console.log('✅ Cart item updated');
        console.log(`📊 Items: ${updateResponse.data.data.summary.itemCount}, Total: $${updateResponse.data.data.summary.total}`);

        // Step 8: Add another item
        console.log('\n➕ Step 8: Add Another Item');
        const productsForSecond = await axios.get(`${BASE_URL}/products`);
        const secondProductId = productsForSecond.data.data.products[1]._id;
        await axios.post(`${BASE_URL}/cart/add`, {
            productId: secondProductId,
            quantity: 1
        }, { headers });
        console.log('✅ Second item added to cart');

        // Step 9: Get full cart
        console.log('\n🛒 Step 9: Get Full Cart');
        const fullCartResponse = await axios.get(`${BASE_URL}/cart`, { headers });
        console.log('✅ Full cart retrieved');
        console.log(`📦 Cart Items:`);
        fullCartResponse.data.data.cart.items.forEach((item, index) => {
            console.log(`   ${index + 1}. ${item.productName} - Qty: ${item.quantity} - $${item.totalPrice}`);
        });

        // Step 10: Remove item from cart
        console.log('\n🗑️  Step 10: Remove Item from Cart');
        const removeResponse = await axios.delete(`${BASE_URL}/cart/remove/${cartItemId}`, { headers });
        console.log('✅ Item removed from cart');
        console.log(`📊 Items: ${removeResponse.data.data.summary.itemCount}, Total: $${removeResponse.data.data.summary.total}`);

        // Step 11: Test checkout preparation
        console.log('\n🛍️  Step 11: Prepare for Checkout');
        const checkoutResponse = await axios.post(`${BASE_URL}/cart/checkout`, {}, { headers });
        console.log('✅ Cart ready for checkout');
        console.log(`📦 Order Items: ${checkoutResponse.data.data.items.length}`);
        console.log(`💰 Order Total: $${checkoutResponse.data.data.summary.total}`);

        // Step 12: Clear cart
        console.log('\n🧹 Step 12: Clear Cart');
        const clearResponse = await axios.delete(`${BASE_URL}/cart/clear`, { headers });
        console.log('✅ Cart cleared');
        console.log(`📊 Cleared ${clearResponse.data.data.clearedItemCount} items`);

        // Step 13: Test cart-based payment
        console.log('\n💳 Step 13: Test Cart-based Payment');
        // First add items back to cart
        await axios.post(`${BASE_URL}/cart/add`, {
            productId: testProductId,
            quantity: 1
        }, { headers });

        const paymentResponse = await axios.post(`${BASE_URL}/payment/initialize`, {
            useCart: true,
            paymentMethod: 'cod',
            shippingAddress: {
                fullName: 'Test User',
                phone: '+1234567890',
                address: '123 Test Street',
                city: 'Test City',
                zipCode: '12345',
                country: 'Bangladesh'
            }
        }, { headers });
        console.log('✅ Cart-based order created with COD');
        console.log(`📦 Order ID: ${paymentResponse.data.data.order._id}`);

        console.log('\n🎉 All Cart API tests completed successfully!');
        console.log('\n📋 Available Cart Endpoints:');
        console.log('   GET    /api/cart                 - Get user cart');
        console.log('   GET    /api/cart/summary         - Get cart summary');
        console.log('   GET    /api/cart/check/:productId - Check if product in cart');
        console.log('   POST   /api/cart/add             - Add item to cart');
        console.log('   PUT    /api/cart/update/:itemId  - Update cart item');
        console.log('   DELETE /api/cart/remove/:itemId  - Remove from cart');
        console.log('   DELETE /api/cart/clear           - Clear entire cart');
        console.log('   POST   /api/cart/checkout        - Prepare cart for checkout');
        console.log('   POST   /api/payment/initialize   - Create order (supports useCart: true)');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

runCartAPITests();
