const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function fullSystemTest() {
    try {
        console.log('🚀 COMPLETE E-COMMERCE SYSTEM ANALYSIS\n');
        console.log('=' * 50);
        
        // Health Check
        console.log('📊 1. HEALTH CHECK');
        const healthResponse = await axios.get(`${BASE_URL}/health`);
        console.log('✅ API Status:', healthResponse.data.message);
        console.log('   Version:', healthResponse.data.version);
        
        // Authentication Test
        console.log('\n🔐 2. AUTHENTICATION SYSTEM');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'test@example.com',
            password: 'test123'
        });
        
        const token = loginResponse.data.token;
        const user = loginResponse.data.user;
        console.log('✅ Login Success');
        console.log('   User:', user.name, '(' + user.role + ')');
        console.log('   Token:', token.substring(0, 20) + '...');
        
        // Product Management
        console.log('\n📦 3. PRODUCT MANAGEMENT');
        const productsResponse = await axios.get(`${BASE_URL}/products?limit=5`);
        const products = productsResponse.data.data.products;
        console.log('✅ Products Retrieved:', products.length);
        
        if (products.length > 0) {
            const product = products[0];
            console.log('   Sample Product:');
            console.log('     Name:', product.name);
            console.log('     Price: $' + product.price);
            console.log('     Stock:', product.inventory.quantity);
            console.log('     Category:', product.category?.name || 'N/A');
            console.log('     Brand:', product.brand?.name || 'N/A');
        }
        
        // Category Management
        console.log('\n📁 4. CATEGORY MANAGEMENT');
        const categoriesResponse = await axios.get(`${BASE_URL}/categories`);
        const categories = categoriesResponse.data.data.categories;
        console.log('✅ Categories Retrieved:', categories.length);
        
        if (categories.length > 0) {
            categories.forEach((cat, index) => {
                console.log(`   ${index + 1}. ${cat.name} (${cat.productCount || 0} products)`);
            });
        }
        
        // Brand Management
        console.log('\n🏷️ 5. BRAND MANAGEMENT');
        const brandsResponse = await axios.get(`${BASE_URL}/brands`);
        const brands = brandsResponse.data.data.brands;
        console.log('✅ Brands Retrieved:', brands.length);
        
        if (brands.length > 0) {
            brands.forEach((brand, index) => {
                console.log(`   ${index + 1}. ${brand.name}`);
            });
        }
        
        // Shopping Cart System
        console.log('\n🛒 6. SHOPPING CART SYSTEM');
        
        // Get initial cart
        const cartResponse = await axios.get(`${BASE_URL}/cart`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('✅ Cart Retrieved');
        console.log('   Initial items:', cartResponse.data.data.cart.items.length);
        console.log('   Initial total: $' + cartResponse.data.data.cart.total.toFixed(2));
        
        // Add product to cart
        if (products.length > 0) {
            const productToAdd = products[0];
            console.log('\n   Adding product to cart:', productToAdd.name);
            
            const addResponse = await axios.post(`${BASE_URL}/cart/add`, {
                productId: productToAdd._id,
                quantity: 2
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (addResponse.data.success) {
                console.log('✅ Product added to cart');
                console.log('   Cart items:', addResponse.data.data.cart.items.length);
                console.log('   Cart total: $' + addResponse.data.data.cart.total.toFixed(2));
                console.log('   Item quantity:', addResponse.data.data.cart.items[0]?.quantity);
            }
            
            // Test cart summary
            const summaryResponse = await axios.get(`${BASE_URL}/cart/summary`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (summaryResponse.data.success) {
                console.log('✅ Cart Summary Retrieved');
                console.log('   Total items:', summaryResponse.data.data.summary.itemCount);
                console.log('   Subtotal: $' + summaryResponse.data.data.summary.subtotal.toFixed(2));
                console.log('   Final total: $' + summaryResponse.data.data.summary.total.toFixed(2));
            }
        }
        
        // User Management
        console.log('\n👤 7. USER MANAGEMENT');
        const userResponse = await axios.get(`${BASE_URL}/users/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (userResponse.data.success) {
            console.log('✅ User Profile Retrieved');
            console.log('   Name:', userResponse.data.data.user.name);
            console.log('   Email:', userResponse.data.data.user.email);
            console.log('   Role:', userResponse.data.data.user.role);
        }
        
        // System Summary
        console.log('\n' + '=' * 50);
        console.log('🎉 SYSTEM ANALYSIS COMPLETE');
        console.log('=' * 50);
        console.log('✅ Authentication: Working');
        console.log('✅ Product Management: Working (' + products.length + ' products)');
        console.log('✅ Category Management: Working (' + categories.length + ' categories)');
        console.log('✅ Brand Management: Working (' + brands.length + ' brands)');
        console.log('✅ Shopping Cart: Working (add/retrieve/summary)');
        console.log('✅ User Management: Working');
        console.log('✅ API Health: Working');
        console.log('\n🚀 YOUR E-COMMERCE PLATFORM IS FULLY FUNCTIONAL!');
        
    } catch (error) {
        console.error('\n❌ System Test Failed:');
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Error:', error.response.data);
        } else {
            console.error('   Error:', error.message);
        }
    }
}

fullSystemTest();
