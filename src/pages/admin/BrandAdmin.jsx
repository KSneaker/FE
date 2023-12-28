
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { getAllBrands, postBrand, updateBrand } from "../../redux/actions/actionsBrand";
import {
    PlusOutlined
} from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, notification } from "antd";
import TableBrand from "../../components/pages/admin/TableBrand";
import { openNotification } from "../../functions/Notification";
const BrandAdmin = () => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditting, setIsEditting] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        getAllBrands(user?.accessToken, dispatch)
    }, [])
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
            await postBrand(user.accessToken, dispatch, e)
            openNotification('Thêm thành công', 'success')
            setOpen(false)
        }
        else {
            await updateBrand(user.accessToken, dispatch, e)
            openNotification('Sửa thành công', 'success')
            setOpen(false)
        }
    }
    return (
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <div className="d-flex justify-content-between">
                <p>Bảng thương hiệu</p>
                <Button type="primary" style={{ marginBottom: 20 }} onClick={handleAdd} icon={<PlusOutlined />}>
                    Add brand
                </Button>
            </div>
            <TableBrand openEdit={openEdit} />

            {/* Modal Add | Edit */}
            <Modal
                title={isEditting ? "Edit brand" : "Add a new brand"}
                width={720}
                onCancel={onClose}
                open={open}
                footer={null}
            >
                <Form
                    onFinish={(e) => onFinish(e)}
                    form={form} layout="vertical" name="dynamic_form_complex"
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
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{
                                    required: true, message: 'Please enter name'
                                }]}
                            >
                                <Input placeholder="Please enter name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    {isEditting ? "Save" : "Submit"}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

            </Modal >


        </div>
    );
}

export default BrandAdmin;