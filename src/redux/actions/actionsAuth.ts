import axios from "axios";
import { BASE_URL } from '../../config'
import { loginFailed, loginSuccess, registerSuccess, registerFailed } from "../reducers/authSlice";

export const loginUser = async (user: any, dispatch: any, navigate: any, openNotification: any) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, user);
        dispatch(loginSuccess(res.data))
        if (res.data.user.admin === 1) {
            navigate('/admin')
        } else {
            navigate("/")
        }
    } catch (error: any) {
        dispatch(loginFailed(error.response.data))
        openNotification(error.response.data, 'error')
    }
}
export const registerUser = async (user: any, dispatch: any, navigate: any) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/register`, user);
        dispatch(registerSuccess())
        navigate("/sign-in")

    } catch (error) {
        dispatch(registerFailed())
    }
}

