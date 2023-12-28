import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../UI/Button"
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../redux/actions/actionsAuth";
import { getCart } from "../../../../redux/actions/actionsCart";
import { useEffect } from "react";
import { getAllWishlist } from "../../../../redux/actions/actionsWishlist";
const User = () => {
    const user = useSelector((state) => state.auth.login.currentUser?.user)
    // console.log('>>user', user)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        getCart(user?.accessToken, dispatch, user?.id)
        getAllWishlist(user?.accessToken, dispatch, user?.id)
    }, [])
    const allCart = useSelector((state) => state.cart.cart?.allCart?.data)
    const allWishlist = useSelector((state) => state.wishlist.wishlist?.allWishlist?.data)
    return (
        < div className="user-list">
            {(user) ?
                <>
                    <NavLink to='/wishlist' className='button' style={{ position: 'relative' }}>
                        <i className="fa-solid fa-heart"></i>
                        {
                            allWishlist?.length ?
                                <div style={{ padding: '0 7px', fontSize: 13, textAlign: 'center', backgroundColor: 'red', color: 'white', borderRadius: '100%', position: 'absolute', top: -7, right: -5 }}>{allWishlist.length}</div>
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
                                <div style={{ padding: '0 7px', fontSize: 13, textAlign: 'center', backgroundColor: 'red', color: 'white', borderRadius: '100%', position: 'absolute', top: -7, right: -5 }}>{allCart.length}</div>
                                : null
                        }
                    </NavLink>

                    <Button className='button' onClick={() => logoutUser(dispatch, navigate)} >
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </Button >
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