import React from 'react';
import {
    CloseOutlined, MinusCircleOutlined
    , PlusOutlined
} from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography } from 'antd';
import { useSelector } from 'react-redux';

const Dashboard: React.FC = () => {
    const [form] = Form.useForm();
    const user = useSelector((state: any) => state.auth.login?.currentUser)

    return (
        <>


        </>
    );
};

export default Dashboard;