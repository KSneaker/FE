import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { Popconfirm, Tag } from 'antd'
import { Button } from "antd";
import Table from "antd/es/table";
import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteProduct } from "../../../redux/actions/actionsProduct";
import { openNotification } from "../../../functions/Notification";

const TableProduct = ({ openEdit }: any) => {

    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.auth.login?.currentUser)
    const allProducts = useSelector((state: any) => state.products.products?.allProducts?.data)
    interface DataType {
        key: number,
        id: number,
        brand: string,
        title: string,
        price: string,
        thumbnail: any,
        description: number,
        sizes: string,
        stock_quantity: number
    }
    const handleDelete = (product: any) => {
        deleteProduct(user?.accessToken, dispatch, product.id, openNotification)
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id',
            align: 'center',
            width: 70
        },
        {
            title: 'Brand ID',
            key: 'brand_id',
            dataIndex: 'brand_id',
            align: 'center',
            width: 120
        },
        {
            title: 'Title',
            key: 'title',
            dataIndex: 'title',
            align: 'center',
            width: 300

        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
            align: 'center',
            width: 200,
        },
        {
            title: 'Thumbnail',
            key: 'thumbnail',
            dataIndex: 'thumbnail',
            align: 'center',
            render: (thumbnail) => <img src={thumbnail} width={100} alt="" />
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
            align: 'center'

        },
        {
            title: 'Sizes',
            key: 'sizes',
            dataIndex: 'sizes',
            align: 'center',
            render: (sizes) => <>
                {
                    sizes?.split(',').map((item: any, index: number) => {
                        return <Tag key={index}>{item}</Tag>
                    })
                }
            </>

        },
        {
            title: 'Stock quantity',
            key: 'stock_quantity',
            dataIndex: 'stock_quantity',
            align: 'center'
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
                        <Popconfirm title="Sure to delete?"
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
        <Table columns={columns} dataSource={allProducts} bordered rowKey={'id'} />
    );
}

export default TableProduct;