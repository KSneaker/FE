import axios from "axios";
import { BASE_URL } from '../../config'
import { loginFailed, loginSuccess, registerSuccess, registerFailed, logoutSuccess, logoutFailed } from "../reducers/authSlice";

export const loginUser = async (user, dispatch, navigate, openNotification) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, user);
        dispatch(loginSuccess(res.data))
        if (res.data.user.admin === 1) {
            navigate('/admin')
        } else {
            navigate("/")
        }
        localStorage.setItem('currentUser', JSON.stringify(res.data))
    } catch (error) {
        dispatch(loginFailed(error.response.data))
        openNotification(error.response.data, 'error')
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/register`, user);
        dispatch(registerSuccess())
        navigate("/sign-in")

    } catch (error) {
        dispatch(registerFailed())
    }
}
export const logoutUser = (dispatch, navigate) => {
    try {

        localStorage.removeItem('currentUser')
        dispatch(logoutSuccess())
        navigate("/")
    } catch (error) {
        dispatch(logoutFailed())
    }
}



