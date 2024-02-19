import axios from "axios";
import { BASE_URL } from '../../config'
import { deleteVoucherFailed, deleteVoucherSuccess, getVouchersFailed, getVouchersSuccess, postVoucherFailed, postVoucherSuccess, updateVoucherFailed, updateVoucherSuccess } from "../reducers/voucherSlice";

export const getAllVouchers = async (accessToken, dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/voucher`, {
            // headers: {
            //     token: `Bearer ${accessToken}`
            // }
        })
        dispatch(getVouchersSuccess(res.data))
    } catch (error) {
        dispatch(getVouchersFailed())
    }
}

export const postVoucher = async (accessToken, dispatch, body) => {
    try {
        const res = await axios.post(`${BASE_URL}/voucher`, body, {
            // headers: {
            //     token: `Bearer ${accessToken}`
            // }
        })
        dispatch(postVoucherSuccess({ ...body, id: res.data.id }))
    } catch (error) {
        dispatch(postVoucherFailed())
    }
}

export const updateVoucher = async (accessToken, dispatch, body) => {
    try {
        const res = await axios.put(`${BASE_URL}/voucher/${body.id}`, body, {
            // headers: {
            //     token: `Bearer ${accessToken}`
            // }
        })
        // console.log(res.data)
        dispatch(updateVoucherSuccess(res.data))
    } catch (error) {
        dispatch(updateVoucherFailed())
    }
}

export const deleteVoucher = async (accessToken, dispatch, id, openNotifycation) => {
    try {
        const res = await axios.delete(`${BASE_URL}/voucher/${id}`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(deleteVoucherSuccess(id))
        openNotifycation('Xóa thành công', 'success')
    } catch (error) {
        dispatch(deleteVoucherFailed())
    }
}