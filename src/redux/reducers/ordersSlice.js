import { createSlice } from "@reduxjs/toolkit";
const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: {
            allOrders: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getOrdersStart: (state) => {
            state.orders.isFetching = true
        },
        getOrdersSuccess: (state, action) => {
            state.orders.isFetching = false;
            state.orders.allOrders = action.payload
        },
        getOrdersFailed: (state) => {
            state.orders.isFetching = false;
            state.orders.error = true;
        },
        updateOrderSuccess: (state, action) => {
            const { order_code, status } = action.payload.data;
            state.orders.isFetching = false;
            state.orders.allOrders.data = state.orders.allOrders.data.map((item) => {
                if (item.order_code === order_code) {
                    return { ...item, status }; // Tạo một object mới và cập nhật dữ liệu
                }
                return item; // Trả về object không cần cập nhật
            });

        },
        updateOrderFailed: (state, action) => {
            state.orders.isFetching = false;
            state.orders.error = true;
        },

    }
})

export const {
    getOrdersStart,
    getOrdersSuccess,
    getOrdersFailed,
    updateOrderSuccess,
    updateOrderFailed
} = ordersSlice.actions;

export default ordersSlice.reducer
