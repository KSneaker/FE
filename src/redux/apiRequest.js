import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerSuccess, registerFailed } from "./authSlice";
import { getUserStart, getUserSuccess, getUserFailed } from "./userSlice"
import { BASE_URL } from '../config'
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, user);
        dispatch(loginSuccess(res.data))
        if (res.data.user.admin === 1) {
            navigate('/admin')
        } else {
            navigate("/")
        }
    } catch (error) {
        dispatch(loginFailed())
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        const res = await axios.post(`${BASE_URL}/auth/register`, user);
        dispatch(registerSuccess())
        navigate("/sign-in")
    } catch (error) {
        dispatch(registerFailed())
    }
}

export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUserStart())
    try {
        const res = await axios.get(`${BASE_URL}/user`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getUserSuccess(res.data))
    } catch (error) {
        dispatch(getUserFailed())
    }
}