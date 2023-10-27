import { useState, ReactNode } from 'react';
import logo from '../../../assets/images/logo.png';
import {
    HomeOutlined,
    DatabaseOutlined,
    PercentageOutlined,
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MessageOutlined,
    BellOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Tooltip, Badge } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const AdminContent = ({ children }: { children: ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label: <Link to=''>Trang chủ</Link>
                        },
                        {
                            key: '2',
                            icon: <DatabaseOutlined />,
                            label: <Link to='product-manager'>Quản lý sản phẩm</Link>
                        },
                        {
                            key: '3',
                            icon: <UserOutlined />,
                            label: <Link to='user-manager'>Quản lý người dùng</Link>
                        },
                        {
                            key: '4',
                            icon: <PercentageOutlined />,
                            label: <Link to=''>Khuyến mại</Link>
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header className='admin-header' style={{ background: colorBgContainer }}>
                    <div className="collapse-button">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </div>
                    <div className="notification col-xl-1">
                        <Tooltip placement="bottom" title="Tin nhắn">
                            <Badge size="small" count={5}>
                                <MessageOutlined style={{ fontSize: 25 }} />
                            </Badge>
                        </Tooltip>
                        <Tooltip placement="bottom" title="Thông báo">
                            <Badge size="small" count={5}>
                                <BellOutlined style={{ fontSize: 25 }} />
                            </Badge>
                        </Tooltip>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 900,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout >
    );
};

export default AdminContent;