import axios from "axios";
import { BASE_URL } from '../../config'
import { loginFailed, loginSuccess, registerSuccess, registerFailed, logoutSuccess, logoutFailed, updateUserSuccess, updateUserFailed } from "../reducers/authSlice";
import { openNotification } from "../../functions/Notification";

export const loginUser = async (user, dispatch, navigate, openNotification) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, user);
        dispatch(loginSuccess(res.data))
        if (res.data.user.admin === 1) {
            navigate('/admin')
        } else {
            navigate("/")
        }
        openNotification('Đăng nhập thành công', 'success')
        // localStorage.setItem('currentUser', JSON.stringify(res.data))
    } catch (error) {
        dispatch(loginFailed(error.response.data))
        openNotification(error.response.data, 'error')
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/register`, user);
        dispatch(registerSuccess())
        openNotification('Đăng ký thành công', 'success')

        navigate("/sign-in")

    } catch (error) {
        dispatch(registerFailed())
        openNotification(error.response.data, 'error')
    }
}
export const logoutUser = (dispatch, navigate) => {
    try {
        // localStorage.removeItem('currentUser')
        dispatch(logoutSuccess())
        // navigate("/")

    } catch (error) {
        dispatch(logoutFailed())
    }
}


export const updateUser = async (dispatch, body, username) => {

    try {
        const res = await axios.put(`${BASE_URL}/user/${username}`, body)
        console.log('resdata', res.data)
        if (res.data.status === 'success') {
            dispatch(updateUserSuccess(res.data))
            openNotification('Lưu hồ sơ cá nhân thành công', 'success')
        }
    } catch (error) {
        console.log(error.toString())
        dispatch(updateUserFailed())
        openNotification('Lưu hồ sơ cá nhân thất bại', 'error')
    }
}