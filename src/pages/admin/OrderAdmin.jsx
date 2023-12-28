
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Table from "antd/es/table";
import { getAllOrders, updateOrder } from "../../redux/actions/actionsOrders";
import VND from "../../functions/VND";
import { dateFormat } from "../../functions/dateFormat";
import { Button, Col, Form, Image, Input, Modal, Row, Select, Space, Typography, Upload } from "antd";
import {
    SettingOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons'
import { openNotification } from "../../functions/Notification";
const { Option } = Select;
const OrderAdmin = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const allOrders = useSelector((state) => state.orders.orders?.allOrders?.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditting, setIsEditting] = useState(false)
    useEffect(() => {
        if (!user) {
            navigate('/sign-in')
        }
        if (user?.accessToken) {
            getAllOrders(user.accessToken, dispatch)
        }
    }, [])

    const onClose = () => {
        setOpen(false);
    }
    const openEdit = (record) => {
        console.log(record)
        setOpen(true)
        setIsEditting(true)
        form.setFieldsValue(record);
    }
    const onFinish = async (e) => {
        await updateOrder(user.accessToken, dispatch, e)
        openNotification('Cập nhật trạng thái thành công', 'success')
        setOpen(false)
    }
    const modifiedAllOrders = allOrders?.map((order) => {
        return {
            ...order,
            detail: JSON.parse(order.detail),
            information: JSON.parse(order.information),
            order_date: dateFormat(order.order_date)
        }
    })
    // console.log('modifiedAllOrders', modifiedAllOrders)
    const columns = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: 'Tổng tiền',
            key: 'total_money',
            dataIndex: 'total_money',
            align: 'center',
            render: (total) => <>{VND.format(total)}</>
        },
        {
            title: 'Phương thức thanh toán',
            key: 'payment_method',
            dataIndex: 'payment_method',
            align: 'center'
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (status) => {
                switch (status) {
                    case '1': return <>Chờ xác nhận</>;
                    case '2': return <>Đang chuẩn bị hàng</>;
                    case '3': return <>Đang giao hàng</>;
                    case '4': return <>Đã giao hàng</>;
                    case '5': return <>Chờ thanh toán</>;
                    case '6': return <>Đã thanh toán</>;
                    default: return;
                }
            },
            filters: [
                {
                    text: 'Chờ xác nhận',
                    value: '1',
                },
                {
                    text: 'Đang chuẩn bị hàng',
                    value: '2',
                },
                {
                    text: 'Đang giao hàng',
                    value: '3',
                },
                {
                    text: 'Đã thanh toán',
                    value: '4',
                },
            ],
            onFilter: (status, record) => record.status === status,
        },
        {
            title: 'Mã đơn hàng',
            key: 'order_code',
            dataIndex: 'order_code',
            align: 'center',

        },
        {
            title: 'Ngày đặt hàng',
            key: 'order_date',
            dataIndex: 'order_date',
            align: 'center',

        },
        {
            title: <SettingOutlined />,
            key: 'settings',
            align: 'center',
            width: 100,
            render: (order) => {
                return (
                    <div className="" style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <Button type="primary" size={'large'} style={{ display: 'flex', alignItems: 'center' }}
                            onClick={() => openEdit(order)}
                        >
                            <EditOutlined />
                        </Button>
                    </div>
                )
            }

        },
        // {
        //     title: 'detail',
        //     key: 'detail',
        //     dataIndex: 'detail',
        //     align: 'center'
        // },
    ];


    return (
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <div className="d-flex justify-content-between">
                <p>Bảng đơn hàng</p>

            </div>
            <Table columns={columns} dataSource={modifiedAllOrders} rowKey={'id'} bordered />
            <Modal
                title={'Chi tiết đơn hàng'}
                width={720}
                onCancel={onClose}
                open={open}
                footer={null}
            >
                <Form
                    onFinish={(e) => onFinish(e)}
                    form={form} layout="vertical" name="dynamic_form_complex"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="id"
                                label="ID"
                            >
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="order_code"
                                label="Mã đơn hàng"
                            >
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="total_money"
                                label="Tổng tiền (đ)"
                            >
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="order_date"
                                label="Ngày đặt hàng"
                            >
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="payment_method"
                                label="Phương thức thanh toán"
                            >
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="status"
                                label="Trạng thái"
                            >
                                <Select>
                                    <Option value='1' >Chờ xác nhận</Option>
                                    <Option value='2' >Đang chuẩn bị hàng</Option>
                                    <Option value='3' >Đang giao hàng</Option>
                                    <Option value='4' >Đã giao hàng</Option>
                                    <Option value='5' >Chờ thanh toán</Option>
                                    <Option value='6' >Đã thanh toán</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.List name='detail'>
                        {(fields) => {
                            return (
                                < >
                                    {fields.map(({ key, name }) => {
                                        return (
                                            <Row key={key} gutter={16}>
                                                <Col span={8} style={{ alignItems: 'center' }}>
                                                    <Form.Item
                                                        label='Ảnh'
                                                        name={[name, 'thumbnail']}
                                                    >
                                                        <img src={form.getFieldValue(['detail', key, 'thumbnail'])} width={100} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={16}>
                                                    <Row>
                                                        <Col span={24}>
                                                            <Form.Item
                                                                label='Tên sản phẩm'
                                                                name={[name, 'title']}
                                                            >
                                                                <Input readOnly />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                label='Kích cỡ'
                                                                name={[name, 'size']}
                                                            >
                                                                <Input readOnly />
                                                            </Form.Item>
                                                        </Col>

                                                        <Col span={12}>
                                                            <Form.Item
                                                                label='Số lượng'
                                                                name={[name, 'quantity']}
                                                            >
                                                                <Input readOnly />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Col >

                                            </Row>
                                        )
                                    })}
                                </>
                            )
                        }}
                    </Form.List>
                    <Row gutter={16}>

                        <Col span={8}>
                            <Form.Item
                                label='Tên'
                                name={['information', 'fullname']}
                            >
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label='SĐT người nhận'
                                name={['information', 'phone_number']}
                            >
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                label='Email người nhận'
                                name={['information', 'email']}
                            >
                                <Input placeholder="fullname" readOnly />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label='Email người nhận'
                                name={['information', 'email']}
                            >
                                <Input placeholder="fullname" readOnly />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='Địa chỉ nhận hàng'
                                name={['information', 'address']}
                            >
                                <Input readOnly />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={16}>

                        <Col span={24}>
                            <Form.Item
                                label='Ghi chú'
                                name={['information', 'note']}
                            >
                                <Input.TextArea readOnly />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Lưu
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Form.Item noStyle shouldUpdate>
                        {() => (
                            <Typography>
                                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                            </Typography>
                        )}
                    </Form.Item> */}
                </Form >

            </Modal >
        </div>
    );
}

export default OrderAdmin;