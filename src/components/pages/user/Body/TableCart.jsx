import { Table } from "antd";
import Button from "../../../UI/Button";
import VND from "../../../../functions/VND";
import { SettingOutlined } from '@ant-design/icons'
const TableCart = ({ ...props }) => {
    const { allCart, handleDecreaseQuantity, handleIncreaseQuantity, handleRemoveCart, handleSelectionChange } = props;
    const columns = [
        {
            title: 'ẢNH',
            dataIndex: 'thumbnail',
            align: 'center',
            width: 150,
            render: (thumbnail) => {
                return (
                    <div className="product-detail d-flex flex-column align-items-center">
                        <img src={thumbnail} alt="" width={100} />
                    </div>
                )
            }

        },
        {
            title: 'TÊN',
            dataIndex: 'title',
            align: 'center',
            render: (title) => {
                return (
                    <div className="product-detail d-flex flex-column align-items-center">
                        {title}
                    </div>
                )
            }

        },
        {
            title: 'KÍCH CỠ',
            dataIndex: 'size',
            align: 'center',
            width: 150,
            render: (size) => {
                return (
                    <div className="size">
                        {size}
                    </div>
                )
            }
        },
        {
            title: 'GIÁ',
            dataIndex: 'price',
            align: 'center',
            width: 200,
            render: (price, record) => {
                return (
                    <>{VND.format(price * (1 - record.discount / 100))}</>
                )
            }
        },
        {
            title: 'SỐ LƯỢNG',
            align: 'center',
            width: 250,
            render: (cart) => <div className="d-flex justify-content-center" >
                <button className="button"
                    onClick={() => handleDecreaseQuantity(cart)}>-</button>
                <input className="button" type="text" value={cart.quantity} readOnly style={{ width: 50, textAlign: 'center', outline: 'none' }} />
                <button className="button" onClick={() => handleIncreaseQuantity(cart)}>+</button>
            </div>
        },
        {
            title: 'TẠM TÍNH',
            dataIndex: 'price',
            align: 'center',
            width: 200,
            render: (price, record) => {
                return (
                    <>{VND.format(price * record.quantity * (1 - record.discount / 100))}</>
                )
            }
        },
        {
            title: <SettingOutlined />,
            align: 'center',
            width: 150,
            render: (cart) => {
                return (
                    <div className="" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button className=" button heart" onClick={() => handleRemoveCart(cart)}>
                            <i className="fa-regular fa-trash-can"></i>
                        </Button>
                    </div>
                )
            }


        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // Call the callback function passed from the parent component
            console.log('selectedRows', selectedRows)
            const modifiedSelectedRows = selectedRows.map((item) => {
                return {
                    ...item,
                    price: item.price * (1 - item.discount / 100)
                }
            })
            handleSelectionChange(selectedRowKeys, modifiedSelectedRows);
        },

    };
    return (
        <Table
            rowSelection={{
                type: "checkbox",
                ...rowSelection,

            }}
            bordered
            columns={columns}
            dataSource={allCart}
            // bordered

            pagination={false}
            rowKey={'id'}
        />


    );
}

export default TableCart;