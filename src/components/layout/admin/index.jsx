
import { Outlet } from 'react-router-dom';
import AdminContent from './AdminContent';

const AdminLayout = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    return currentUser.user.admin === 1 &&
        <div className="admin-layout">
            <AdminContent>
                <Outlet />
            </AdminContent>
        </div>



};

export default AdminLayout;