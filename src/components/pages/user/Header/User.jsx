import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../../../UI/Button"
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../redux/actions/actionsAuth";
import { getCart } from "../../../../redux/actions/actionsCart";
import { useEffect, useState } from "react";
import { getAllWishlist } from "../../../../redux/actions/actionsWishlist";
const User = () => {
    const user = useSelector((state) => state.auth.login.currentUser?.user)
    // console.log('>>user', user)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [showLogout, setShowLogout] = useState(false)
    useEffect(() => {
        getCart(user?.accessToken, dispatch, user?.id)
        getAllWishlist(user?.accessToken, dispatch, user?.id)
    }, [])
    const allCart = useSelector((state) => state.cart.cart?.allCart?.data)
    const allWishlist = useSelector((state) => state.wishlist.wishlist?.allWishlist?.data)
    const handleLogout = () => {
        logoutUser(dispatch, navigate);
    }
    return (
        < div className="user-list" style={{ position: 'relative' }}>
            {(user) ?
                <>
                    <NavLink to='/wishlist' className='button' style={{ position: 'relative' }}>
                        <i className="fa-solid fa-heart"></i>
                        {
                            allWishlist?.length ?
                                <div style={{ padding: '4px 6px', fontSize: 13, textAlign: 'center', backgroundColor: 'red', color: 'white', borderRadius: '100%', position: 'absolute', top: -7, right: -5 }}>{allWishlist.length}</div>
                                : null
                        }
                    </NavLink>

                    {/* <Button className='button' >
                        <i className="fa-solid fa-user"></i>
                    </Button > */}

                    <NavLink to='/cart' className='button' style={{ position: 'relative' }}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        {
                            allCart?.length ?
                                <div style={{ padding: '4px 6px', fontSize: 13, textAlign: 'center', backgroundColor: 'red', color: 'white', borderRadius: '100%', position: 'absolute', top: -7, right: -5 }}>{allCart.length}</div>
                                : null
                        }
                    </NavLink>
                    <div
                        style={{ borderRadius: 8 }}
                        onMouseLeave={() => { setShowLogout(false) }}
                        onMouseEnter={() => { setShowLogout(true) }}
                    >
                        <NavLink to='/user' className='button user'
                        >
                            <i className="fa-solid fa-user"></i>
                        </NavLink>
                        {showLogout ?
                            <ul className='show-logout' >
                                <Link to='/user'>
                                    <li className='button' style={{ color: '#000' }}>
                                        Thông tin cá nhân
                                    </li>
                                </Link>
                                <Link>
                                    <li className='button' onClick={handleLogout} style={{ color: '#000' }}>
                                        Đăng xuất
                                    </li>
                                </Link>

                            </ul>
                            : null
                        }
                    </div>
                </>
                :
                <>
                    <NavLink to="/sign-in">
                        <Button className='button sign-in sign' >
                            <span>Đăng nhập</span>
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </Button>
                    </NavLink>
                    <NavLink to="/sign-up">
                        <Button className='button sign-up sign' >
                            <span>Đăng ký</span>
                            <i className="fa-solid fa-user-plus"></i>
                        </Button >
                    </NavLink>
                </>
            }
        </div >
    );
}

export default User;