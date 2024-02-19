
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button, Popconfirm } from "antd";
import Table from "antd/es/table";
import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteBrand, getAllBrands } from "../../../redux/actions/actionsBrand";
import { openNotification } from '../../../functions/Notification';

const TableBrand = ({ openEdit }) => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        getAllBrands(user?.accessToken, dispatch)
    }, [])
    const allBrands = useSelector((state) => state.brands.brands?.allBrands?.data)
    const handleDelete = (brand) => {
        deleteBrand(user?.accessToken, dispatch, brand.id, openNotification)
    }
    const columns = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'Tên',
            key: 'name',
            dataIndex: 'name'

        },
        {
            title: 'Tiêu đề',
            key: 'title',
            dataIndex: 'title'

        },
        {
            title: <SettingOutlined />,
            key: 'settings',
            align: 'center',
            width: 100,
            render: (brand) => {
                return (
                    <div className="" style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <Button type="primary" size={'large'} style={{ display: 'flex', alignItems: 'center' }}
                            onClick={() => openEdit(brand)}
                        >
                            <EditOutlined />
                        </Button>
                        <Popconfirm title="Bạn có muốn xóa (Nếu xóa sẽ xóa tất cả sản phẩm thuộc thương hiệu này)?"
                            onConfirm={() => handleDelete(brand)}
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

    return <Table bordered columns={columns} dataSource={allBrands} rowKey={'id'} />
}

export default TableBrand;