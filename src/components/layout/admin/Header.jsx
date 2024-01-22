import { useEffect } from "react";

import { Row, Col } from "antd";
import { NavLink } from "react-router-dom";

const Header = ({ name }) => {
    let content;

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

    useEffect(() => window.scrollTo(0, 0));
    return (
        <Row style={{ margin: 10, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Col span={24} md={6}>
                <span style={{ textTransform: "capitalize" }}>
                    <NavLink to=''>Trang chủ</NavLink> / {content}
                </span>
            </Col>
            <Col span={24} md={18} className="header-control">

            </Col>
        </Row>
    );
}

export default Header;
