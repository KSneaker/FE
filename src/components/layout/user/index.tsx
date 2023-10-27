// import React, { ReactNode } from "react";
// import Header from "../../pages/user/Header";
// import Footer from "../../pages/user/Footer";
// const UserLayout = ({ children }: { children: ReactNode }) => {
//     return (
//         <div className="App">
//             <header id="header">
//                 <Header />
//             </header>
//             <main id="main">
//                 {children}
//             </main>
//             <footer id="footer">
//                 <Footer />
//             </footer>
//         </div>
//     );
// }

// export default UserLayout;


import { Outlet } from 'react-router-dom';
import UserContent from './UserContent';

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <UserContent>
                <Outlet />
            </UserContent>
        </div>
    );
};

export default AdminLayout;