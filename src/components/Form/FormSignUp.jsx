import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { registerUser } from "../../redux/actions/actionsAuth";
import SubmitBtn from "./SubmitBtn";

const FormSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = (e) => {
        registerUser(e, dispatch, navigate)
    }
    const [form] = Form.useForm();
    return (
        <div className="form">
            <div className="title">
                Đăng ký
            </div>
            <Form form={form}
                style={{ width: '100%' }}
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên đăng ký!' }
                        , ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (getFieldValue('username')?.indexOf(' ') === -1) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Tên đăng ký không được chứa khoảng trắng!'));
                            },
                        }),
                    ]}
                >
                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password
                        size="large" prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu"
                    />

                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng xác nhận mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        size="large" prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' }
                    ]}
                >
                    <Input size="large" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="phone_number"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại!' }
                    ]}
                >
                    <Input size="large" prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Số điện thoại" />
                </Form.Item>

                <Form.Item >
                    <SubmitBtn form={form} text={'Đăng ký'} />
                </Form.Item>
                <Form.Item>
                    Bạn đã có tài khoản KSneaker? <Link to='/sign-in'>Đăng nhập</Link>
                </Form.Item>

            </Form>
        </div >
    );
}

export default FormSignUp;