
import { useDispatch, useSelector } from "react-redux";
import { Col, List, Popconfirm, Row, Tag } from 'antd'
import { Button } from "antd";
import Table from "antd/es/table";
import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteProduct } from "../../../redux/actions/actionsProduct";
import { openNotification } from "../../../functions/Notification";
import VND from "../../../functions/VND";

const TableProduct = ({ openEdit }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.login?.currentUser)
    const allProducts = useSelector((state) => state.products.products?.allProducts)
    const handleDelete = (product) => {
        deleteProduct(user?.accessToken, dispatch, product.id, openNotification)
    }
    const columns = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id',
            align: 'center',
            width: 70
        },
        {
            title: 'Thương hiệu',
            key: 'brand_id',
            dataIndex: 'brand_id',
            align: 'center',
            width: 100
        },
        {
            title: 'Phân loại',
            key: 'category_id',
            dataIndex: 'category_id',
            align: 'center',
            width: 100
        },
        {
            title: 'Tên SP',
            key: 'title',
            dataIndex: 'title',
            align: 'center',
            width: 200

        },
        {
            title: 'Giá',
            key: 'price',
            dataIndex: 'price',
            align: 'center',
            width: 200,
            render: (price) => <>{VND.format(price)}</>
        },
        {
            title: 'Ảnh chính',
            key: 'thumbnail',
            dataIndex: 'thumbnail',
            align: 'center',
            render: (thumbnail) => <img src={thumbnail} width={100} alt="" />
        },
        {
            title: 'Mô tả',
            key: 'description',
            dataIndex: 'description',
            align: 'center',
            width: 200,



        },
        {
            title: 'Kích cỡ & Số lượng ',
            key: 'size_quantity',
            dataIndex: 'sizeQuantity',
            align: 'center',
            width: 300,
            render: (sizes) => {
                return (<List  >
                    {
                        sizes?.map((item, index) =>
                            <List.Item key={index}>
                                Kích cỡ: <Tag >{item.size}</Tag>
                                Số lượng: <Tag >{item.quantity}</Tag>
                            </List.Item>
                        )
                    }

                </List>)
            },
        },
        {
            title: 'Số lượng còn lại',
            key: 'stock_quantity',
            dataIndex: 'sizeQuantity',
            align: 'center',
            render: (sizes) => {
                return <>
                    {
                        sizes?.reduce((total, item) =>
                            total + item.quantity, 0)
                    }
                </>


            }

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

        }
    ];

    return (
        <Table columns={columns} size="middle" pagination={{ pageSize: 5 }} dataSource={allProducts} bordered rowKey={'id'} />
    );
}

export default TableProduct;