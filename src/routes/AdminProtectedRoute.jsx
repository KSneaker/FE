import { useSelector } from "react-redux";
import AdminLayout from "../components/layout/admin";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = () => {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const currentUser = useSelector((state) => state.auth.login?.currentUser)

    return currentUser?.accessToken && currentUser?.user.admin === 1
        ? <AdminLayout />
        :
        (currentUser?.user.admin === 0 ? <Navigate to='/' /> : <Navigate to='/sign-in' />)

}

export default AdminProtectedRoute;