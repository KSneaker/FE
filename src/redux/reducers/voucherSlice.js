import { createSlice } from "@reduxjs/toolkit";
const voucherSlice = createSlice({
    name: 'voucher',
    initialState: {
        vouchers: {
            allVouchers: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getVouchersSuccess: (state, action) => {
            state.vouchers.isFetching = false;
            state.vouchers.allVouchers = action.payload
        },
        getVouchersFailed: (state) => {
            state.vouchers.isFetching = false;
            state.vouchers.error = true;
        },

        postVoucherSuccess: (state, action) => {
            state.vouchers.isFetching = false;
            state.vouchers.allVouchers.data = [...state.vouchers.allVouchers.data, action.payload]
        },
        postVoucherFailed: (state) => {
            state.vouchers.error = true;
        },
        updateVoucherSuccess: (state, action) => {
            const { id, ...updatedVoucherData } = action.payload.data;
            console.log('payload', action.payload)
            state.vouchers.isFetching = false;
            state.vouchers.allVouchers.data = state.vouchers.allVouchers.data.map((item) => {
                if (item.id === id) {
                    return { ...item, ...updatedVoucherData }; // Tạo một object mới và cập nhật dữ liệu
                }
                return item; // Trả về object không cần cập nhật
            });

        },
        updateVoucherFailed: (state) => {
            state.vouchers.isFetching = false;
            state.vouchers.error = true;
        },
        deleteVoucherSuccess: (state, action) => {
            state.vouchers.isFetching = false;
            const newAllVouchers = state.vouchers.allVouchers.data.filter((item) => item.id !== action.payload)
            state.vouchers.allVouchers.data = newAllVouchers;
        },
        deleteVoucherFailed: (state) => {
            state.vouchers.isFetching = false;
            state.vouchers.error = true;
        }
    }
})

export const {
    getVouchersSuccess,
    getVouchersFailed,
    postVoucherSuccess,
    postVoucherFailed,
    updateVoucherSuccess,
    updateVoucherFailed,
    deleteVoucherSuccess,
    deleteVoucherFailed,
} = voucherSlice.actions;

export default voucherSlice.reducer
