import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/actionsAuth";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { openNotification } from "../../functions/Notification";
import SubmitBtn from "./SubmitBtn";

const FormSignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = (e) => {
        loginUser(e, dispatch, navigate, openNotification)
    }
    const [form] = Form.useForm();

    return (

        <div className="form">
            <div className="title">
                Đăng nhập
            </div>
            <Form form={form}
                style={{ width: '100%' }}
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"

                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        size="large"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu"
                    />

                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot" href="#">
                        Quên mật khẩu?
                    </a>
                </Form.Item>

                <Form.Item >
                    <SubmitBtn form={form} />
                </Form.Item>
                <Form.Item>
                    Bạn mới biết đến KSneaker? <Link style={{ textDecoration: 'underline' }} to='/sign-up'>Đăng ký ngay</Link>
                </Form.Item>
            </Form>
        </div>
    );
}

export default FormSignIn;