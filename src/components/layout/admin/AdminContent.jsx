import { useState, useEffect } from 'react';
import {
    HomeOutlined,
    DatabaseOutlined,
    PercentageOutlined,
    UserOutlined,
    ShopOutlined,
    CheckCircleOutlined,
    AreaChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Tooltip, Badge } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../redux/actions/actionsAuth';
import Header from './Header';
// const { Header, Sider, Content } = Layout;
import logo from '../../../assets/images/logo.png'
const { Sider, Content } = Layout;
const AdminContent = ({ children }) => {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const currentUser = useSelector((state) => state.auth.login?.currentUser?.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!currentUser) {
            navigate('/sign-in')
        }
    }, [])
    const { pathname } = useLocation();
    const path = pathname.replace("/admin/", "");
    return (
        <div className='d-flex'>
            <div className='col-xxl-2' >
                <div style={{ position: 'sticky', top: 0 }}>


                    <div style={{ textAlign: 'center' }}>
                        <img src={logo} alt="" height={50} />
                    </div>
                    <Menu
                        style={{ border: 'none' }}
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <AreaChartOutlined />,
                                label: <Link to=''>Trang chủ</Link>
                            },
                            {
                                key: '2',
                                icon: <DatabaseOutlined />,
                                label: <Link to='product-manager'>Quản lý sản phẩm</Link>
                            },
                            {
                                key: '3',
                                icon: <DatabaseOutlined />,
                                label: <Link to='image-product-manager'>Quản lý ảnh sản phẩm</Link>
                            },
                            {
                                key: '4',
                                icon: <UserOutlined />,
                                label: <Link to='user-manager'>Quản lý người dùng</Link>
                            },
                            {
                                key: '5',
                                icon: <ShopOutlined />,
                                label: <Link to='orders-manager'>Quản lý đơn hàng</Link>
                            },
                            {
                                key: '6',
                                icon: <CheckCircleOutlined />,
                                label: <Link to='brand-manager'>Quản lý hãng</Link>
                            },
                            {
                                key: '7',
                                icon: <PercentageOutlined />,
                                label: <Link to='voucher-manager'>Quản lý mã giảm giá</Link>
                            },
                            {
                                key: '8',
                                icon: <HomeOutlined />,
                                label: <Link to='/'>KSneaker</Link>
                            },
                        ]}
                    />
                </div>
            </div>
            <Layout className='col-xxl-10' style={{ padding: '0 20px', minHeight: 1000 }}>
                <Header name={path} />
                <Content>
                    {children}
                </Content>
            </Layout>
        </div >
    );
};

export default AdminContent;