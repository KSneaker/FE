import { createSlice } from "@reduxjs/toolkit";
const brandSlice = createSlice({
    name: 'Brand',
    initialState: <any>{
        brands: {
            allBrands: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getBrandsSuccess: (state, action) => {
            state.brands.isFetching = false;
            state.brands.allBrands = action.payload
        },
        getBrandsFailed: (state) => {
            state.brands.isFetching = false;
            state.brands.error = true;
        },

        postBrandsuccess: (state, action) => {
            state.brands.isFetching = false;
            state.brands.allBrands.data = [...state.brands.allBrands.data, action.payload]
        },
        postBrandFailed: (state) => {
            state.brands.error = true;
        },
        updateBrandSuccess: (state, action) => {
            const { id, ...updatedBrandData } = action.payload.data;
            console.log('payload', action.payload)
            state.brands.isFetching = false;
            state.brands.allBrands.data = state.brands.allBrands.data.map((item: any) => {
                if (item.id === id) {
                    return { ...item, ...updatedBrandData }; // Tạo một object mới và cập nhật dữ liệu
                }
                return item; // Trả về object không cần cập nhật
            });

        },
        updateBrandFailed: (state) => {
            state.brands.isFetching = false;
            state.brands.error = true;
        },
        deleteBrandSuccess: (state, action) => {
            state.brands.isFetching = false;
            const newAllBrands = state.brands.allBrands.data.filter((item: any) => item.id !== action.payload)
            state.brands.allBrands.data = newAllBrands;
        },
        deleteBrandFailed: (state) => {
            state.brands.isFetching = false;
            state.brands.error = true;
        }
    }
})

export const {
    getBrandsSuccess,
    getBrandsFailed,
    postBrandsuccess,
    postBrandFailed,
    updateBrandSuccess,
    updateBrandFailed,
    deleteBrandSuccess,
    deleteBrandFailed,
} = brandSlice.actions;

export default brandSlice.reducer
