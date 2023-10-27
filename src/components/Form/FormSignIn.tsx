import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
const FormSignIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleShowPassword = (e: any) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }
    const handleSubmitForm = (e: any) => {
        e.preventDefault()
        const newUser = {
            username: username,
            password: password
        }
        loginUser(newUser, dispatch, navigate)
    }
    return (
        <div className='form-content' >
            <div className="input-field">
                <label htmlFor="userName">Tên đăng nhập</label>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username} placeholder='Nhập tên đăng nhập'
                    type="text"
                    id="userName" />
            </div>
            <div className="input-field password">
                <label htmlFor="password">Mật khẩu</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} placeholder='Nhập mật khẩu'
                    type={showPassword ? "text" : "password"}
                    id="password" />
                {password
                    ?
                    <i className={showPassword ? "fa-solid fa-eye-slash togglePassword" : "fa-solid fa-eye togglePassword"}
                        onClick={(e) => handleShowPassword(e)}>
                    </i>
                    :
                    null
                }

            </div>
            <button disabled={username && password ? false : true}
                className={username && password ? "button active " : "button not-allowed"} type="submit"
                onClick={(e) => handleSubmitForm(e)}
            >Đăng nhập</button>
        </div >
    );
}

export default FormSignIn;