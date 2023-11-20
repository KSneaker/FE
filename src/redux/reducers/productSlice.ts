import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
    name: 'Product',
    initialState: {
        products: <any>{
            allProducts: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {

        getProductsSuccess: (state, action) => {
            state.products.isFetching = false;
            state.products.allProducts = action.payload
        },
        getProductsFailed: (state) => {
            state.products.isFetching = false;
            state.products.error = true;
        },

        postProductSuccess: (state, action) => {
            // console.log('payload', action.payload)
            const { sizeQuantity, ...other } = action.payload
            // console.log('size quantiy', sizeQuantity)
            const stock_quantity = sizeQuantity.reduce((total: number, item: any) => total + parseInt(item.quantity), 0)
            const concatenatedSizes = sizeQuantity.map((size: any) => size.size).join(',');

            // console.log('stock', stock_quantity)
            state.products.isFetching = false;
            state.products.allProducts.data = [...state.products.allProducts.data, { id: action.payload.id, ...other, sizes: concatenatedSizes, stock_quantity: stock_quantity }]
        },
        postProductFailed: (state) => {
            state.products.error = true;
        },

        updateProductSuccess: (state, action) => {
            const { id, ...updatedProductData } = action.payload.data;
            state.products.isFetching = false;
            const index = state.products.allProducts.data.findIndex((product: any) => product.id === id);
            console.log('state.products.allProducts.data', state.products.allProducts.data)
            // state.products.allProducts.data = [
            //     ...state.products.allProducts.data.slice(0, index),
            //     { ...state.products.allProducts.data[index], ...updatedProductData },
            //     ...state.products.allProducts.data.slice(index + 1)
            // ]

            state.products.allProducts.data = state.products.allProducts.data.map((item: any) => {
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
            const newAllProducts = state.products.allProducts.data.filter((item: any) => item.id !== action.payload)
            state.products.allProducts.data = newAllProducts;
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
