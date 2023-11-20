import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import usersReducer from './reducers/userSlice'
import productReducer from './reducers/productSlice'
import brandReducer from './reducers/brandSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        products: productReducer,
        brands: brandReducer
    }
})