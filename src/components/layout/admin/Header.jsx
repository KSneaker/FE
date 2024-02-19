import { useEffect } from "react";

import { Row, Col, Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/actions/actionsAuth";
import { useDispatch } from "react-redux";
import {
    LogoutOutlined
} from '@ant-design/icons';
const Header = ({ name }) => {
    let content;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    switch (name) {
        case 'product-manager':
            content = 'Quản lý Sản phẩm';
            break;
        case 'user-manager':
            content = 'Quản lý Người dùng';
            break;
        case 'brand-manager':
            content = 'Quản lý Thương hiệu';
            break;
        case 'orders-manager':
            content = 'Quản lý Đơn hàng';
            break;
        case 'voucher-manager':
            content = 'Quản lý Mã giảm giá';
            break;
        default:
            content = 'Bảng điều khiển'
    }
    const handleLogout = () => {
        logoutUser(dispatch, navigate);
    }
    useEffect(() => window.scrollTo(0, 0));
    return (
        <Row style={{ margin: 10, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Col span={24} md={22}>
                <span style={{ textTransform: "capitalize" }}>
                    <NavLink to=''>Trang chủ</NavLink> / {content}
                </span>
            </Col>
            <Col span={24} md={2} className="header-control">
                <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                    Đăng xuất
                </Button>
            </Col>
        </Row>
    );
}

export default Header;
