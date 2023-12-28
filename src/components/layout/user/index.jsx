import { Outlet } from 'react-router-dom';
import UserContent from './UserContent';

const UserLayout = () => {
    return (
        <div className="user-layout">
            <UserContent>
                <Outlet />
            </UserContent>
        </div>
    );
};

export default UserLayout;