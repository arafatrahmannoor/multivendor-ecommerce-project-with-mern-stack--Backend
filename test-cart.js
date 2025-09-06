const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./model/user');
const Product = require('./model/product');
const Cart = require('./model/cart');

async function testCartFunctionality() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🚀 Testing Cart Functionality\n');

        // Get a test user and products
        const user = await User.findOne({ role: 'user' });
        if (!user) {
            console.log('❌ No test user found. Create a user first.');
            return;
        }

        const products = await Product.find({ status: 'active' }).limit(3);
        if (products.length === 0) {
            console.log('❌ No active products found. Run seed-database.js first.');
            return;
        }

        console.log(`👤 Test User: ${user.name} (${user.email})`);
        console.log(`📦 Available Products: ${products.length}\n`);

        // Test 1: Create or get cart
        console.log('🧪 Test 1: Get or Create Cart');
        let cart = await Cart.getOrCreateCart(user._id);
        console.log(`✅ Cart created/retrieved. ID: ${cart._id}`);
        console.log(`📊 Initial cart summary: ${cart.itemCount} items, Total: $${cart.total}\n`);

        // Test 2: Add items to cart
        console.log('🧪 Test 2: Add Items to Cart');
        for (let i = 0; i < 2; i++) {
            const product = products[i];
            await cart.addItem(product, 2);
            console.log(`✅ Added ${product.name} (Qty: 2) to cart`);
        }

        // Refresh cart to see updated totals
        cart = await Cart.findById(cart._id);
        console.log(`📊 Updated cart: ${cart.itemCount} items, Subtotal: $${cart.subtotal}, Total: $${cart.total}\n`);

        // Test 3: Update item quantity
        console.log('🧪 Test 3: Update Item Quantity');
        if (cart.items.length > 0) {
            const firstItem = cart.items[0];
            await cart.updateItemQuantity(firstItem._id, 5);
            console.log(`✅ Updated ${firstItem.productName} quantity to 5`);
            
            cart = await Cart.findById(cart._id);
            console.log(`📊 Updated cart: ${cart.itemCount} items, Total: $${cart.total}\n`);
        }

        // Test 4: Remove item
        console.log('🧪 Test 4: Remove Item from Cart');
        if (cart.items.length > 1) {
            const itemToRemove = cart.items[1];
            await cart.removeItem(itemToRemove._id);
            console.log(`✅ Removed ${itemToRemove.productName} from cart`);
            
            cart = await Cart.findById(cart._id);
            console.log(`📊 Updated cart: ${cart.itemCount} items, Total: $${cart.total}\n`);
        }

        // Test 5: Cart with populated products
        console.log('🧪 Test 5: Get Cart with Product Details');
        const populatedCart = await Cart.findById(cart._id)
            .populate('items.product', 'name price images status inventory');
        
        console.log('📦 Cart Items with Product Details:');
        populatedCart.items.forEach((item, index) => {
            console.log(`   ${index + 1}. ${item.productName}`);
            console.log(`      Price: $${item.unitPrice} x ${item.quantity} = $${item.totalPrice}`);
            console.log(`      Product Status: ${item.product.status}`);
            console.log(`      Stock Available: ${item.product.inventory.quantity}`);
        });

        // Test 6: Cart Summary
        console.log('\n📊 Final Cart Summary:');
        console.log(`   Items: ${cart.itemCount}`);
        console.log(`   Subtotal: $${cart.subtotal}`);
        console.log(`   Tax (5%): $${cart.tax}`);
        console.log(`   Service Charge (5%): $${cart.serviceCharge}`);
        console.log(`   Shipping: $${cart.shippingCost}`);
        console.log(`   Total: $${cart.total}`);

        // Test 7: Clear cart
        console.log('\n🧪 Test 6: Clear Cart');
        await cart.clearCart();
        console.log(`✅ Cart cleared. Items: ${cart.itemCount}, Total: $${cart.total}`);

        console.log('\n🎉 All cart functionality tests completed successfully!');

        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Error testing cart:', error);
        await mongoose.disconnect();
    }
}

testCartFunctionality();
