import { Outlet } from 'react-router-dom';
import LoginContent from './LoginContent';

const LoginLayout = () => {
    return (
        <div className="user-layout">
            <LoginContent>
                <Outlet />
            </LoginContent>
        </div>
    );
};

export default LoginLayout;