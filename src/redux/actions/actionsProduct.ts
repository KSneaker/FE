import axios from "axios";
import { BASE_URL } from '../../config'
import {
    getProductsSuccess, getProductsFailed, postProductSuccess,
    postProductFailed, deleteProductSuccess, deleteProductFailed, updateProductSuccess, updateProductFailed
} from "../reducers/productSlice"

export const getAllProducts = async (accessToken: string, dispatch: any) => {
    try {
        const res = await axios.get(`${BASE_URL}/product`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getProductsSuccess(res.data))
    } catch (error) {
        dispatch(getProductsFailed())
    }
}
export const postProduct = async (accessToken: string, dispatch: any, body: any) => {
    // console.log('body', body)
    // console.log('accessToken', accessToken)
    try {
        const { sizeQuantity, ...other } = body
        const res = await axios.post(`${BASE_URL}/product`, { ...other }, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        // console.log(res.data.id)
        for (const item of sizeQuantity) {
            const size = { ...item, product_id: res.data.id }
            console.log(size)
            const res_size = await axios.post(`${BASE_URL}/size`, size, {
                headers: {
                    token: `Bearer ${accessToken}`
                }
            })
        }

        dispatch(postProductSuccess({ ...body, id: res.data.id }))
    } catch (error) {
        dispatch(postProductFailed())
    }
}

export const updateProduct = async (accessToken: string, dispatch: any, body: any) => {
    try {
        const res = await axios.put(`${BASE_URL}/product/${body.id}`, body, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(updateProductSuccess(res.data))
    } catch (error) {
        dispatch(updateProductFailed())
    }
}

export const deleteProduct = async (accessToken: string, dispatch: any, id: number, openNotifycation: any) => {
    try {
        const res = await axios.delete(`${BASE_URL}/product/${id}`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(deleteProductSuccess(id))
        openNotifycation('Xóa thành công', 'success')
    } catch (error) {
        dispatch(deleteProductFailed())
    }
}