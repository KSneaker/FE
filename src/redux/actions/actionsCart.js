import axios from "axios";
import { BASE_URL } from '../../config'
import {
    getCartStart, getCartSuccess, getCartFailed, postCartSuccess,
    postCartFailed,
    removeCartSuccess, removeCartFailed,
    increaseQuantitySuccess, increaseQuantityFailed,
    decreaseQuantitySuccess, decreaseQuantityFailed,
} from "../reducers/cartSlice"
import { openNotification } from "../../functions/Notification";

export const getCart = async (accessToken, dispatch, userId) => {
    dispatch(getCartStart())
    try {
        const res = await axios.get(`${BASE_URL}/cart/${userId}`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getCartSuccess(res.data))
    } catch (error) {
        dispatch(getCartFailed())
    }
}
export const postCart = async (accessToken, dispatch, body) => {
    const res = await axios.post(`${BASE_URL}/cart/check-cart`, body, {
        headers: {
            token: `Bearer ${accessToken}`
        }
    })
    const res2 = await axios.post(`${BASE_URL}/cart/check-stock`, body)
    if (res.data.data?.length > 0) {
        if (res.data.data[0].quantity < res2.data.data[0].quantity) {
            const cartID = res.data.data[0].id
            await axios.post(`${BASE_URL}/cart/increase`, { cartID }, {
                headers: {
                    token: `Bearer ${accessToken}`
                }
            })
            openNotification('Thêm số lượng vào giỏ hàng thành công ', 'success')
        }
        else {
            openNotification('Bạn không thể thêm quá số lượng có sẵn ', 'error')
        }
    }
    else {
        try {
            const res = await axios.post(`${BASE_URL}/cart`, body, {
                headers: {
                    token: `Bearer ${accessToken}`
                }
            })
            dispatch(postCartSuccess({ ...body, id: res.data.id }))
            openNotification('Thêm vào giỏ hàng thành công ', 'success')

        } catch (error) {
            dispatch(postCartFailed())
        }
    }
}

export const increaseQuantity = async (accessToken, dispatch, cartID) => {
    try {
        await axios.post(`${BASE_URL}/cart/increase`, { cartID }, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        // console.log(res)
        dispatch(increaseQuantitySuccess(cartID))
    } catch (error) {
        console.log(error)
        dispatch(increaseQuantityFailed())
    }
}
export const decreaseQuantity = async (accessToken, dispatch, cartID) => {
    try {
        await axios.post(`${BASE_URL}/cart/decrease`, { cartID }, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        // console.log(res)

        dispatch(decreaseQuantitySuccess(cartID))
    } catch (error) {
        console.log(error)

        dispatch(decreaseQuantityFailed())
    }
}
export const removeCart = async (accessToken, dispatch, cartID) => {
    try {
        const res = await axios.delete(`${BASE_URL}/cart/${cartID}`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(removeCartSuccess(cartID))
    } catch (error) {
        dispatch(removeCartFailed())
    }
}
