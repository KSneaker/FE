import { NavLink } from "react-router-dom";
import Button from "../../../UI/Button"
import UserLayout from "../../../layout/user";
import { useSelector } from "react-redux";
const User = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser?.user)
    console.log('>>user', user)
    return (
        < div className="user-list">
            {(user) ?
                <>
                    <Button className='button' >
                        <i className="fa-solid fa-heart"></i>
                    </Button>
                    <Button className='button' >
                        <i className="fa-solid fa-user"></i>
                    </Button >
                    <NavLink to='/cart'>
                        <Button className='button' >
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Button>
                    </NavLink>
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
        </div>
    );
}

export default User;