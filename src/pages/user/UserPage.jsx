import { useEffect } from "react";
import { NavLink, Outlet, redirect } from "react-router-dom";

const UserPage = () => {
    useEffect(() => {
        redirect("profile");
    })
    return (
        <div className="page-container">
            <div className="wrapper d-flex ">
                <div className="col-xxl-2" >
                    <ul className="filter-side">
                        <NavLink to='' >
                            <li className="list-user ">
                                <i className="fa-solid fa-user"></i>
                                Thông tin cá nhân
                            </li>
                        </NavLink>
                        <NavLink to='order'>
                            <li className="list-user">
                                <i className="fa-solid fa-store"></i>
                                Đơn hàng
                            </li>
                        </NavLink>
                    </ul>

                </div>
                <div className="col-xxl-10" style={{ border: '1px solid rgba(0,0,0,0.12)', borderRadius: 8, padding: '15px 30px', margin: '0 20px' }}>
                    <Outlet />
                </div>
            </div>
        </div >
    );
}

export default UserPage;