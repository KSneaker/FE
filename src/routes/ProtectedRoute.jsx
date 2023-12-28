import UserLayout from "../components/layout/user";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    return currentUser?.accessToken
        ? <UserLayout />
        :
        <Navigate to='sign-in' replace />


}

export default ProtectedRoute;