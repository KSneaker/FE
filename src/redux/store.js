import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import usersReducer from './reducers/userSlice'
import productReducer from './reducers/productSlice'
import brandReducer from './reducers/brandSlice'
import wishlistReducer from './reducers/wishlistSlice'
import cartReducer from './reducers/cartSlice'
import ordersReducer from './reducers/ordersSlice'
import voucherReducer from './reducers/voucherSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    products: productReducer,
    brands: brandReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    orders: ordersReducer,
    voucher: voucherReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)