import { NavLink } from 'react-router-dom'
const NavBar = () => {
    return (
        <div className="nav-bar-list col-xxl-6 col-xl-5 col-lg-5 col-md-6">
            <NavLink className="nav-bar-item" to="/">
                Trang chủ
            </NavLink>
            <NavLink className="nav-bar-item" to="/allProducts/nike">
                Giày Nike
            </NavLink>
            <NavLink className="nav-bar-item" to="/allProducts/adidas">
                Giày Adidas
            </NavLink>
            <NavLink className="nav-bar-item" to="/allProducts/converse">
                Giày Converse
            </NavLink>
            <NavLink className="nav-bar-item" to="/allProducts">
                Toàn bộ sản phẩm
            </NavLink>
        </div>
    );
}

export default NavBar;