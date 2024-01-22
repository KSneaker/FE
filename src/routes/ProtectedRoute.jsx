import { useSelector } from "react-redux";
import UserLayout from "../components/layout/user";
import { Navigate } from "react-router-dom";
import HomePage from "../pages/user/HomePage";

const ProtectedRoute = () => {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const currentUser = useSelector((state) => state.auth.login?.currentUser?.user)
    return currentUser
        ? <UserLayout />
        :
        <Navigate to='sign-in' replace />


}

export default ProtectedRoute;