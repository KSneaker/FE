import FormSignIn from "../../components/Form/FormSignIn";

const SignInPage = () => {
    return (
        <div className="page-container">
            <div className="form-container">
                <div className="form">
                    <div className="title">
                        Đăng nhập
                    </div>
                    <FormSignIn />
                </div>
            </div>
        </div>
    );
}

export default SignInPage;