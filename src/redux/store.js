import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import usersReducer from './reducers/userSlice'
import productReducer from './reducers/productSlice'
import brandReducer from './reducers/brandSlice'
import wishlistReducer from './reducers/wishlistSlice'
import cartReducer from './reducers/cartSlice'
import ordersReducer from './reducers/ordersSlice'
import voucherReducer from './reducers/voucherSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        products: productReducer,
        brands: brandReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
        orders: ordersReducer,
        voucher: voucherReducer
    }
})