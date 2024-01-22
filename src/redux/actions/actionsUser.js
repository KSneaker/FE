import axios from "axios";
import { BASE_URL } from '../../config'
import { getUserSuccess, getUserFailed } from "../reducers/userSlice"

export const getAllUsers = async (accessToken, dispatch) => {
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
