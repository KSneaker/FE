import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const FormCheckout = ({ onFinish, formInfo }) => {

    return (
        <div className="" style={{ padding: 20, boxShadow: 'rgba(0, 0, 0, 0.12) 0 0 0 1px', borderRadius: 5 }}>
            <h5 style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', padding: 10, marginBottom: 20 }}>Thông tin giao hàng</h5>
            <Form
                form={formInfo}
                name="formCheckout"
                layout="vertical"
            >
                <Form.Item
                    label="Họ tên:"
                    name="fullname"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                    <Input autoFocus />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ email:"
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập địa chỉ email!' },
                        { type: 'email', message: 'Địa chỉ email không hợp lệ!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ giao hàng:"
                    name="address"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại:"
                    name="phone_number"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ghi chú:"
                    name="note"
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </div>

    );
};

export default FormCheckout;
