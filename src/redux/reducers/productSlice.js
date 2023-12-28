import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
    name: 'Product',
    initialState: {
        products: {
            allProducts: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getProductsSuccess: (state, action) => {
            const newProduct = []
            action.payload.data.map((item) => {
                const { size_quantity, ...other } = item;
                const sizeQuantity = JSON.parse(size_quantity)
                newProduct.push({ ...other, sizeQuantity })

            })
            state.products.isFetching = false;
            state.products.allProducts = newProduct
        },
        getProductsFailed: (state) => {
            state.products.isFetching = false;
            state.products.error = true;
        },

        postProductSuccess: (state, action) => {
            // console.log('payload', action.payload)
            const { sizeQuantity, ...other } = action.payload
            // console.log('size quantiy', sizeQuantity)
            const stock_quantity = sizeQuantity.reduce((total, item) => total + parseInt(item.quantity), 0)
            const concatenatedSizes = sizeQuantity.map((size) => size.size).join(',');

            // console.log('stock', stock_quantity)
            state.products.isFetching = false;
            state.products.allProducts.data = [...state.products.allProducts.data, { id: action.payload.id, ...other, sizes: concatenatedSizes, stock_quantity: stock_quantity }]
        },
        postProductFailed: (state) => {
            state.products.error = true;
        },

        updateProductSuccess: (state, action) => {
            // console.log('action.payload', action.payload)
            const { id, ...updatedProductData } = action.payload;
            state.products.isFetching = false;
            const index = state.products.allProducts.findIndex((product) => product.id === id);
            // console.log('state.products.allProducts', state.products.allProducts)

            state.products.allProducts = state.products.allProducts.map((item) => {
                if (item.id === id) {
                    return { ...item, ...updatedProductData }; // Tạo một object mới và cập nhật dữ liệu
                }
                return item; // Trả về object không cần cập nhật
            });

        },
        updateProductFailed: (state) => {
            state.products.isFetching = false;
            state.products.error = true;
        },
        deleteProductSuccess: (state, action) => {
            state.products.isFetching = false;
            const newAllProducts = state.products.allProducts.filter((item) => item.id !== action.payload)
            state.products.allProducts = newAllProducts;
        },
        deleteProductFailed: (state) => {
            state.products.isFetching = false;
            state.products.error = true;
        }
    }
})

export const {
    getProductsSuccess,
    getProductsFailed,
    postProductSuccess,
    postProductFailed,
    updateProductSuccess,
    updateProductFailed,
    deleteProductSuccess,
    deleteProductFailed,
} = productSlice.actions;

export default productSlice.reducer
