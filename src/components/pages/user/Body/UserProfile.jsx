import { Button, Col, DatePicker, Form, Input, Radio, Row, Upload } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { BASE_URL } from "../../../../config";
import dayjs from "dayjs";
import vn from 'antd/locale/vi_VN'
import { dateFormat } from "../../../../functions/dateFormat";
import { updateUser } from "../../../../redux/actions/actionsAuth";
import { useDispatch, useSelector } from "react-redux";
const UserProfile = () => {
    const currentUser = useSelector((state) => state.auth?.login?.user)
    const dispatch = useDispatch()
    const modifiedCurrrentUser = {
        ...currentUser,
        birthday: dayjs(`${dateFormat(currentUser?.birthday)}`, 'DD-MM-YYYY')
    }
    const [isChange, setIsChange] = useState(false)
    const [fileList, setFileList] = useState([])

    useEffect(() => {
        setFileList([{
            uid: '-1',
            name: 'image.png',
            url: `${BASE_URL}/image/${modifiedCurrrentUser.avatar}`
        }])
    }, [])
    const handleChange = async ({ fileList: newFileList }) => {
        // console.log(newFileList)
        setFileList(newFileList);
    }
    const onFinish = async (e) => {
        const body = {
            ...e,
            birthday: dayjs(`${e.birthday}`).format('YYYY-MM-DD'),
            avatar: e.avatar.file?.response || e.avatar,
            updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
        updateUser(dispatch, body, currentUser.username)
    }

    return (
        <div>

            <div style={{ margin: '10px 0 20px 0', display: 'flex', gap: 20 }}>
                <h1>
                    Hố sơ cá nhân
                </h1>
                <i onClick={() => { setIsChange(!isChange) }} className="fa-solid fa-pen-to-square"></i>

            </div>

            <Form initialValues={modifiedCurrrentUser}
                onFinish={(e) => onFinish(e)}
                labelAlign="left"
                colon={false}
                disabled={!isChange}
            >
                <Row gutter={16}>
                    <Col span={16}>
                        <Form.Item
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 15 }}
                            label="Tên đăng nhập"
                            name="username"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 15 }}
                            label="Họ tên"
                            name="fullname"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                        >
                            <Input />
                        </Form.Item >
                        <Form.Item
                            labelCol={{ span: 4 }}
                            label="Ngày sinh"
                            name="birthday"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
                        >
                            <DatePicker locale={vn} />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 4 }}
                            label="Giới tính"
                            name="gender"
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                        >
                            <Radio.Group>
                                <Radio value={'1'}>Nam</Radio>
                                <Radio value={'2'}>Nữ</Radio>
                                <Radio value={'3'}>Khác</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 15 }}
                            labelCol={{ span: 4 }}
                            label="Số điện thoại"
                            name="phone_number"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 15 }}
                            labelCol={{ span: 4 }}
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 15 }}
                            labelCol={{ span: 4 }}
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} style={{ textAlign: 'center', borderLeft: '1px solid rgba(0,0,0,0.12)' }} >
                        <Form.Item
                            name="avatar"
                            rules={[{
                                required: true,
                                message: 'Vui lòng chọn ảnh!',
                            }]}
                        >
                            <Upload
                                action={`${BASE_URL}/upload`}
                                name="image"
                                listType="picture-circle"
                                maxCount={1}
                                fileList={fileList}
                                onChange={handleChange}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Chọn ảnh đại diện</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item wrapperCol={{ span: 2 }} >
                    <Button style={{ width: '100%' }} type="primary" htmlType="submit" >
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UserProfile;