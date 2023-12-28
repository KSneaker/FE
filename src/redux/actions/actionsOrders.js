import axios from "axios";
import { BASE_URL } from '../../config'
import {
    getOrdersSuccess,
    getOrdersFailed,
    updateOrderSuccess,
    updateOrderFailed
} from "../reducers/ordersSlice"

export const getAllOrders = async (accessToken, dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/orders`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getOrdersSuccess(res.data))
    } catch (error) {
        dispatch(getOrdersFailed())
    }
}
export const updateOrder = async (accessToken, dispatch, body) => {
    try {
        const res = await axios.put(`${BASE_URL}/orders/${body.order_code}`, { order_code: body.order_code, status: body.status }, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        console.log(res.data)
        dispatch(updateOrderSuccess(res.data))
    } catch (error) {
        dispatch(updateOrderFailed())
    }
}
