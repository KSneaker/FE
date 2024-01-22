import axios from "axios";
import { BASE_URL } from '../../config'
import { getWishlistStart, getWishlistSuccess, getWishlistFailed, postWishlistSuccess, postWishlistFailed, removeWishlistSuccess, removeWishlistFailed } from "../reducers/wishlistSlice"
import { openNotification } from "../../functions/Notification";

export const getAllWishlist = async (accessToken, dispatch, userId) => {
    dispatch(getWishlistStart())
    try {
        const res = await axios.get(`${BASE_URL}/wishlist/${userId}`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getWishlistSuccess(res.data))
    } catch (error) {
        dispatch(getWishlistFailed())
    }
}
export const postWishlist = async (accessToken, dispatch, body) => {
    try {

        const res = await axios.post(`${BASE_URL}/wishlist/check-wishlist`, body, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        if (res.data.data.length > 0) {
            openNotification('Đã có trong danh sách yêu thích', 'error')
        }
        else {
            try {
                const res = await axios.post(`${BASE_URL}/wishlist`, body, {
                    headers: {
                        token: `Bearer ${accessToken}`
                    }
                })
                // console.log(res.data)
                dispatch(postWishlistSuccess({ ...body, id: res.data.id }))
                openNotification('Thêm vào danh sách yêu thích thành công ', 'success')

            } catch (error) {
                dispatch(postWishlistFailed())
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}


export const removeWishlist = async (accessToken, dispatch, wishlistID) => {
    try {
        const res = await axios.delete(`${BASE_URL}/wishlist/${wishlistID}`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(removeWishlistSuccess(wishlistID))
        openNotification("Xóa khỏi danh sách yêu thích thành công", 'success')
    } catch (error) {
        dispatch(removeWishlistFailed())
    }
}