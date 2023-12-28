import { useSelector } from "react-redux";
import { useEffect } from 'react'
import FormSignIn from "../../components/Form/FormSignIn";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {

    const user = useSelector((state) => state.auth.login.currentUser)
    const navigate = useNavigate()
    useEffect(() => {
        if (user?.accessToken) {
            navigate('/')
        }
    }, [])

    return (
        <div className="background-image">
            <div className="form-container">
                <FormSignIn />
            </div>
        </div>
    );
}

export default SignInPage;