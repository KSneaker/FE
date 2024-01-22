import { Button, Table, Tabs } from "antd";
import useFetch from "../../../../hooks/useFetch";
import { BASE_URL } from "../../../../config";
import { useSelector } from "react-redux";
import { dateFormat } from "../../../../functions/dateFormat";
import VND from "../../../../functions/VND";
import {
    SettingOutlined,
    EyeOutlined,
} from '@ant-design/icons'
const UserOrder = () => {
    const currentUser = useSelector((state) => state.auth?.login?.user)
    const { data: allOrders, isLoading } = useFetch(`${BASE_URL}/orders/${currentUser.id}`)
    const modifiedAllOrders = allOrders?.map((order) => {
        return {
            ...order,
            detail: JSON.parse(order.detail),
            information: JSON.parse(order.information),
            order_date: dateFormat(order.order_date)
        }
    })
    const columns = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: 'Mã đơn hàng',
            key: 'order_code',
            dataIndex: 'order_code',
            align: 'center',

        },
        {
            title: 'Tổng tiền',
            key: 'total_money',
            dataIndex: 'total_money',
            align: 'center',
            render: (total) => <>{VND.format(total)}</>
        },
        {
            title: 'Phương thức thanh toán',
            key: 'payment_method',
            dataIndex: 'payment_method',
            align: 'center'
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (status) => {
                switch (status) {
                    case '1': return <>Chờ xác nhận</>;
                    case '2': return <>Đang chuẩn bị hàng</>;
                    case '3': return <>Đang giao hàng</>;
                    case '4': return <>Đã giao hàng</>;
                    case '5': return <>Chờ thanh toán</>;
                    case '6': return <>Đã thanh toán</>;
                    default: return;
                }
            },
            filters: [
                {
                    text: 'Chờ xác nhận',
                    value: '1',
                },
                {
                    text: 'Đang chuẩn bị hàng',
                    value: '2',
                },
                {
                    text: 'Đang giao hàng',
                    value: '3',
                },
                {
                    text: 'Đã giao hàng',
                    value: '4',
                },
                {
                    text: 'Chờ thanh toán',
                    value: '5',
                },
                {
                    text: 'Đã thanh toán',
                    value: '6',
                },
            ],
            onFilter: (status, record) => record.status === status,
        },

        {
            title: 'Ngày đặt hàng',
            key: 'order_date',
            dataIndex: 'order_date',
            align: 'center',
        },
        {
            title: <SettingOutlined />,
            key: 'settings',
            align: 'center',
            width: 100,
            render: (order) => {
                return (
                    <div className="" style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <Button type="primary" size={'large'} style={{ display: 'flex', alignItems: 'center' }}
                        // onClick={() => openEdit(order)}
                        >
                            <EyeOutlined />
                        </Button>
                    </div>
                )
            }
        },
    ];

    return (
        <>
            <div style={{ margin: '10px 0 20px 0', display: 'flex', gap: 20 }}>
                <h1>
                    Đơn hàng
                </h1>
            </div>
            <Table columns={columns} dataSource={modifiedAllOrders} rowKey={'id'} bordered />
        </>
    );
}

export default UserOrder;