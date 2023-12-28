import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {
            allCart: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getCartStart: (state) => {
            state.cart.isFetching = true
        },
        getCartSuccess: (state, action) => {
            state.cart.isFetching = false;
            state.cart.allCart = action.payload
        },
        getCartFailed: (state) => {
            state.cart.isFetching = false;
            state.cart.error = true;
        },
        postCartSuccess: (state, action) => {
            state.cart.isFetching = false;
            state.cart.allCart.data = [...state.cart.allCart.data, action.payload]
        },
        postCartFailed: (state) => {
            state.cart.error = true;
        },
        decreaseQuantitySuccess: (state, action) => {
            state.cart.isFetching = false;
            const newAllCart = state.cart.allCart.data.map((item) => {
                if (item.id == action.payload) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    }
                }
                return item
            })
            state.cart.allCart.data = newAllCart;
        },
        decreaseQuantityFailed: (state) => {
            state.cart.error = true;
        },
        increaseQuantitySuccess: (state, action) => {
            state.cart.isFetching = false;
            const newAllCart = state.cart.allCart.data.map((item) => {
                if (item.id == action.payload) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                }
                return item
            })
            state.cart.allCart.data = newAllCart;
        },
        increaseQuantityFailed: (state) => {
            state.cart.error = true;
        },
        removeCartSuccess: (state, action) => {
            state.cart.isFetching = false;
            const newAllCart = state.cart.allCart.data.filter((item) => item.id !== action.payload)
            state.cart.allCart.data = newAllCart;
        },
        removeCartFailed: (state) => {
            state.cart.isFetching = false;
            state.cart.error = true;
        }
    }
})

export const {
    getCartStart,
    getCartSuccess,
    getCartFailed,
    postCartSuccess,
    postCartFailed,
    removeCartSuccess,
    removeCartFailed,
    increaseQuantitySuccess,
    increaseQuantityFailed,
    decreaseQuantitySuccess,
    decreaseQuantityFailed,
} = cartSlice.actions;

export default cartSlice.reducer
