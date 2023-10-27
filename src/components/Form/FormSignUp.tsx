import { useState } from "react";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const FormSignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showRepassword, setShowRepassword] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleShowPassword = (e: any) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }
    const handleShowRepassword = (e: any) => {
        e.preventDefault()
        setShowRepassword(!showRepassword)
    }
    const handleSubmitForm = (e: any) => {
        e.preventDefault()
        const newUser = {
            username: username,
            password: password
        }
        registerUser(newUser, dispatch, navigate)
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
            <div className="input-field password">
                <label htmlFor="password">Nhắc lại mật khẩu</label>
                <input
                    onChange={(e) => setRepassword(e.target.value)}
                    value={repassword} placeholder='Nhập lại mật khẩu'
                    type={showRepassword ? "text" : "password"}
                    id="password" />
                {password
                    ?
                    <i className={showRepassword ? "fa-solid fa-eye-slash togglePassword" : "fa-solid fa-eye togglePassword"}
                        onClick={(e) => handleShowRepassword(e)}>
                    </i>
                    :
                    null
                }

            </div>
            <button disabled={username && password && repassword ? false : true}
                className={username && password && repassword ? "button active " : "button not-allowed"} type="submit"
                onClick={(e) => handleSubmitForm(e)}
            >Đăng ký</button>
        </div >
    );
}

export default FormSignUp;