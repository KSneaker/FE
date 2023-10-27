
import { Outlet } from 'react-router-dom';
import AdminContent from './AdminContent';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <AdminContent>
                <Outlet />
            </AdminContent>
        </div>
    );
};

export default AdminLayout;