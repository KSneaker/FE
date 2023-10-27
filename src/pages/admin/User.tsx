
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import { getAllUsers } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
const User = () => {
    const user = useSelector((state: any) => state.auth.login?.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/sign-in')
        }
        if (user?.accessToken) {
            // console.log('>>', user.accessToken)
            getAllUsers(user.accessToken, dispatch)
        }
    }, [])
    return (
        <>
            User
        </>
    );
}

export default User;