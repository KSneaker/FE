import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { getAllUsers } from "../../redux/actions/actionsUser";
import { useNavigate } from "react-router-dom";
import Table from "antd/es/table";
import { PlusOutlined, MinusCircleOutlined, } from '@ant-design/icons';
import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BASE_URL } from "../../config";
import { Button, Col, Input, Modal, Popconfirm, Row, Select, Form, Upload } from "antd";
const { Option } = Select;

const User = () => {
    const [open, setOpen] = useState(false);
    const [isEditting, setIsEditting] = useState(false)
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([])
    const user = useSelector((state) => state.auth.login?.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/sign-in')
        }
        if (user?.accessToken) {
            getAllUsers(user.accessToken, dispatch)
        }
    }, [])
    const allUsers = useSelector((state) => state.users.users?.allUsers?.data)

    // console.log('allUsers', allUsers)
    const modifiedAllUser = allUsers?.map(({ body, ...item }) => ({
        ...item,
        key: item.id
    }))


    const columns = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: 'Họ tên',
            key: 'fullname',
            dataIndex: 'fullname',
            align: 'center'

        },
        {
            title: 'Tên đăng nhập',
            key: 'username',
            dataIndex: 'username',
            align: 'center'
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
            align: 'center'
        },
        {
            title: 'Số điện thoại',
            key: 'phone_number',
            dataIndex: 'phone_number',
            align: 'center'

        },
        {
            title: 'Ảnh đại diện',
            key: 'avatar',
            dataIndex: 'avatar',
            align: 'center',
            render: (avatar) => <img width={100} height={100} src={`${BASE_URL}/image/${avatar}`} alt="" />
        },

        {
            title: 'Địa chỉ',
            key: 'address',
            dataIndex: 'address',
            align: 'center'
        },
        {
            title: 'Admin',
            key: 'admin',
            dataIndex: 'admin',
            align: 'center'
        },
        {
            title: <SettingOutlined />,
            key: 'settings',
            align: 'center',
            width: 100,
            render: (product) => {
                return (
                    <div className="" style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <Button type="primary" size={'large'} style={{ display: 'flex', alignItems: 'center' }}
                            onClick={() => openEdit(product)}
                        >
                            <EditOutlined />
                        </Button>
                        <Popconfirm title="Bạn có muốn xóa?"
                            onConfirm={() => handleDelete(product)}
                        >
                            <Button type="primary" size={'large'} danger style={{ display: 'flex', alignItems: 'center' }} >
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }
        },
    ];

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
        console.log(newFileList)
    };

    const onClose = () => {
        setOpen(false);
    }

    const handleAdd = () => {
        setFileList([])
        setOpen(true);
        form.resetFields();
    };

    const openEdit = (record) => {
        setFileList(
            [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: `${BASE_URL}/image/${record.avatar}`,
                }
            ]
        )
        setOpen(true)
        setIsEditting(true)
        form.setFieldsValue(record);
    }
    const onFinish = async (e) => {

    }
    const handleDelete = () => {

    }
    return (
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: 20 }}>
                <p>Bảng người dùng</p>
                <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
                    Thêm người dùng
                </Button>
            </div>
            <Table columns={columns} dataSource={modifiedAllUser} bordered />
            <Modal
                title={isEditting ? "Chỉnh sửa dăng nhập" : "Thêm dăng nhập mới"}
                width={720}
                onCancel={onClose}
                open={open}
                footer={null}
            >
                <Form onFinish={(e) => onFinish(e)} form={form} layout="vertical" name="dynamic_form_complex"
                >
                    {
                        isEditting && <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="id"
                                    label="ID"
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                    }
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="username"
                                label="Tên đăng nhập"
                                rules={[{
                                    required: true, message: 'Vui lòng nhập tên đăng nhập!'
                                }]}
                            >
                                <Input placeholder="Tên đăng nhập" readOnly />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="fullname"
                                label="Họ và tên"
                                rules={[{
                                    required: true, message: 'Vui lòng nhập họ tên!'
                                }]}
                            >
                                <Input placeholder="Họ tên" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{
                                    required: true, message: 'Vui lòng nhập tên dăng nhập!'
                                }]}
                            >
                                <Input placeholder="Email" readOnly />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone_number"
                                label="Số điện thoại"
                            >
                                <Input placeholder="Số điện thoại" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                            >
                                <Input.TextArea rows={4} placeholder="Địa chỉ" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="admin"
                                label="Phân quyền"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn',
                                    },
                                ]}
                            >
                                <Select placeholder="Phân quyền">
                                    <Option value={1} >Admin</Option>
                                    <Option value={0} >Người dùng</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="avatar"
                                label="Ảnh đại diện"
                                rules={[{
                                    required: true,
                                    message: 'Vui lòng chọn ảnh!',
                                }]}
                            >
                                <Upload
                                    listType="picture-card"
                                    beforeUpload={(file) => {
                                        // console.log(">>> file: ", file);
                                        return false;
                                    }}
                                    fileList={fileList}
                                    onChange={onChange}
                                    maxCount={1}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Tải lên</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    {isEditting ? "Lưu" : "Thêm"}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal >
        </div>

    );
}

export default User;