import { createSlice } from "@reduxjs/toolkit";
const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: {
            allWishlist: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getWishlistStart: (state) => {
            state.wishlist.isFetching = true
        },
        getWishlistSuccess: (state, action) => {
            state.wishlist.isFetching = false;
            state.wishlist.allWishlist = action.payload
        },
        getWishlistFailed: (state) => {
            state.wishlist.isFetching = false;
            state.wishlist.error = true;
        },
        postWishlistSuccess: (state, action) => {
            state.wishlist.isFetching = false;
            state.wishlist.allWishlist.data = [...state.wishlist.allWishlist.data, action.payload]
        },
        postWishlistFailed: (state) => {
            state.wishlist.error = true;
        },
        removeWishlistSuccess: (state, action) => {
            state.wishlist.isFetching = false;
            const newAllWishlist = state.wishlist.allWishlist.data.filter((item) => item.wishlist_id !== action.payload)
            state.wishlist.allWishlist.data = newAllWishlist;
        },
        removeWishlistFailed: (state) => {
            state.wishlist.isFetching = false;
            state.wishlist.error = true;
        }
    }
})

export const {
    getWishlistStart,
    getWishlistSuccess,
    getWishlistFailed,
    postWishlistSuccess,
    postWishlistFailed,
    removeWishlistSuccess,
    removeWishlistFailed
} = wishlistSlice.actions;

export default wishlistSlice.reducer
