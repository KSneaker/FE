
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import Table from "antd/es/table";
import { SettingOutlined, EditOutlined } from '@ant-design/icons';
import { getAllBrands } from "../../../redux/actions/actionsBrand";

const TableBrand = ({ openEdit }) => {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        getAllBrands(user?.accessToken, dispatch)
    }, [])
    const allBrands = useSelector((state) => state.brands.brands?.allBrands?.data)


    const columns = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name'

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
                    </div>
                )
            }

        }
    ];

    return <Table bordered columns={columns} dataSource={allBrands} rowKey={'id'} />
}

export default TableBrand;