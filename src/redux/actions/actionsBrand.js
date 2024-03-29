import axios from "axios";
import { BASE_URL } from '../../config'
import { deleteBrandFailed, deleteBrandSuccess, getBrandsFailed, getBrandsSuccess, postBrandFailed, postBrandsuccess, updateBrandFailed, updateBrandSuccess } from "../reducers/brandSlice";

export const getAllBrands = async (accessToken, dispatch) => {
    try {
        const res = await axios.get(`${BASE_URL}/brand`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getBrandsSuccess(res.data))
    } catch (error) {
        dispatch(getBrandsFailed())
    }
}

export const postBrand = async (accessToken, dispatch, body) => {
    try {
        const res = await axios.post(`${BASE_URL}/brand`, body, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(postBrandsuccess({ ...body, id: res.data.id }))
    } catch (error) {
        dispatch(postBrandFailed())
    }
}

export const updateBrand = async (accessToken, dispatch, body) => {
    try {
        const res = await axios.put(`${BASE_URL}/brand/${body.id}`, body, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        // console.log(res.data)
        dispatch(updateBrandSuccess(res.data))
    } catch (error) {
        dispatch(updateBrandFailed())
    }
}

export const deleteBrand = async (accessToken, dispatch, id, openNotifycation) => {
    try {
        const res = await axios.delete(`${BASE_URL}/brand/${id}`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(deleteBrandSuccess(id))
        openNotifycation('Xóa thành công', 'success')
    } catch (error) {
        dispatch(deleteBrandFailed())
    }
}