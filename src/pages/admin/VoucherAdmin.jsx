
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { getAllVouchers, postVoucher, updateVoucher } from "../../redux/actions/actionsVoucher";
import {
    PlusOutlined, SettingOutlined, EditOutlined
} from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, notification, Table, Select, InputNumber } from "antd";
import { openNotification } from "../../functions/Notification";
import { dateFormat, reverseDate } from "../../functions/dateFormat";

import moment from "moment";
import { getAllBrands } from "../../redux/actions/actionsBrand";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import dayjs from 'dayjs';
const VoucherAdmin = () => {
    // console.log(moment().format('YYMMDDHHmmss'))


    const user = useSelector((state) => state.auth.login?.currentUser)
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditting, setIsEditting] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        getAllVouchers(user?.accessToken, dispatch)
        getAllBrands(user?.accessToken, dispatch)
    }, [])
    const allVouchers = useSelector((state) => state.voucher.vouchers?.allVouchers?.data)
    const allBrands = useSelector((state) => state.brands.brands?.allBrands?.data)
    const onClose = () => {
        setOpen(false);
    }

    const handleAdd = () => {
        setOpen(true);
        setIsEditting(false)
        form.resetFields();
    };
    const openEdit = (record) => {
        setOpen(true)
        setIsEditting(true)
        form.setFieldsValue(record);
    }

    const onFinish = async (e) => {
        if (!isEditting) {
            const body = {
                ...e,
                expiration_date: moment(reverseDate(e.expiration_date)).format('YYYY-MM-DD HH:mm:ss'),
                created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                brand: `${e.brand}`,
                // name: dataEdit
            }
            await postVoucher(user.accessToken, dispatch, body)
            openNotification('Thêm thành công', 'success')
            setOpen(false)
        }
        else {
            const body = {
                ...e,
                expiration_date: moment(reverseDate(e.expiration_date)).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                created_at: reverseDate(e.created_at),
                brand: `${e.brand}`
            }
            await updateVoucher(user.accessToken, dispatch, body)
            openNotification('Sửa thành công', 'success')
            setOpen(false)
        }
    }

    const modifiedAllVouchers = allVouchers?.map((voucher) => {
        return {
            ...voucher,
            expiration_date: dateFormat(voucher.expiration_date),
            created_at: dateFormat(voucher.created_at),
            brand: voucher.brand?.split(',').map(Number)
        }
    })

    const columns = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: 'Mã giảm giá',
            key: 'code',
            dataIndex: 'code',
            align: 'center',
            render: (code) => {
                return <span style={{ textTransform: 'uppercase' }}> {code}</span>
            }
        },
        {
            title: 'Tên mã',
            key: 'name',
            dataIndex: 'name',
            align: 'center',
            // render: (name) => <div dangerouslySetInnerHTML={{ __html: name }} />
        },
        {
            title: 'Giảm giá',
            key: 'discount',
            dataIndex: 'discount',
            align: 'center'
        },
        {
            title: 'Ngày hết hạn',
            key: 'expiration_date',
            dataIndex: 'expiration_date',
            align: 'center',
        },
        {
            title: <SettingOutlined />,
            key: 'settings',
            align: 'center',
            width: 100,
            render: (record) => {
                return (
                    <div className="" style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <Button type="primary" size={'large'} style={{ display: 'flex', alignItems: 'center' }}
                            onClick={() => openEdit(record)}
                        >
                            <EditOutlined />
                        </Button>
                    </div>
                )
            }

        },
    ];
    const [dataEdit, setDataEdit] = useState('')
    const onEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log(typeof data, data)
        setDataEdit(data);
    };
    return (
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <div className="d-flex justify-content-between">
                <p>Bảng Mã giảm giá</p>
                <Button type="primary" style={{ marginBottom: 20 }} onClick={handleAdd} icon={<PlusOutlined />}>
                    Thêm mã giảm giá
                </Button>
            </div>

            <Table columns={columns} dataSource={modifiedAllVouchers} rowKey={'id'} bordered />

            {/* Modal Add | Edit */}
            <Modal
                title={isEditting ? "Chỉnh sửa mã giảm giá" : "Thêm mã giảm giá"}
                width={720}
                onCancel={onClose}
                open={open}
                footer={null}
            >
                <Form
                    onFinish={(e) => onFinish(e)}
                    form={form} layout="vertical" name="dynamic_form_complex"
                    autoComplete="off"
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

                        <Col span={6}>
                            <Form.Item
                                name="code"
                                label="Mã giảm giá"
                                rules={[{
                                    required: true, message: 'Vui lòng nhập mã giảm giá'
                                }]}
                            >
                                <Input placeholder="VD: NAMMOI20" style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="discount"
                                label="Giảm giá (%)"
                                rules={[{
                                    required: true, message: 'Vui lòng nhập số lượng giảm'
                                }]}
                            >
                                <InputNumber placeholder="VD: 20" min={0} max={100} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Tên mã"
                                rules={[{
                                    required: true, message: 'Vui lòng nhập tên mã!'
                                }]}
                            >
                                <Input placeholder="VD: Giảm giá năm mới" />

                                {/* <CKEditor
                                    data={form.getFieldValue(['name'])}
                                    editor={ClassicEditor}
                                    onChange={onEditorChange}
                                /> */}
                            </Form.Item>
                        </Col>
                    </Row>

                    {isEditting ?
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="created_at"
                                    label="Ngày tạo mã"
                                    rules={[{
                                        required: true, message: ''
                                    }]}
                                >
                                    <Input placeholder="VD: 30/1/2024" readOnly />
                                </Form.Item>
                            </Col>
                        </Row> : null
                    }
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="expiration_date"
                                label="Ngày hết hạn"
                                rules={[{
                                    required: true, message: 'Vui lòng nhập ngày hết hạn'
                                }]}
                            >
                                <Input placeholder="VD: 30/1/2024" />

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="brand"
                                label="Thương hiệu"
                                rules={[{
                                    required: true, message: 'Vui lòng chọn thương hiệu'
                                }]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    fieldNames={{ label: 'title', value: 'id' }}
                                    placeholder="Chọn thương hiệu"
                                    options={allBrands}
                                />
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

export default VoucherAdmin;