import { useEffect, useState, useMemo } from 'react';
import Empty from '../../components/UI/Empty';
import Loading from '../../components/UI/Loading';
import TableCart from '../../components/pages/user/Body/TableCart';
import { decreaseQuantity, getCart, increaseQuantity, removeCart } from '../../redux/actions/actionsCart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { openNotification } from '../../functions/Notification';
import axios from 'axios';
import { BASE_URL } from '../../config';

const CartPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    // console.log(selectedRows)
    const handleSelectionChange = (keys, rows) => {
        setSelectedRowKeys(keys);
        setSelectedRows(rows);
    }
    const user = useSelector((state) => state.auth.login.currentUser)
    const allCart = useSelector((state) => state.cart.cart?.allCart?.data)
    useEffect(() => {
        if (!user?.accessToken) {
            navigate('/sign-in')
        }
        else {
            getCart(user?.accessToken, dispatch, user.user.id)
        }
    }, [])

    const handleDecreaseQuantity = (cart) => {
        if (cart.quantity > 1) {
            decreaseQuantity(user?.accessToken, dispatch, cart.id)
        }
        else {
            removeCart(user?.accessToken, dispatch, cart.id)
        }
    }
    const handleIncreaseQuantity = async (cart) => {
        // console.log(cart)
        const res = await axios.post(`${BASE_URL}/cart/check-stock`, {
            product_id: cart.product_id,
            size: cart.size
        })
        if (cart.quantity < res.data.data[0].quantity) {
            increaseQuantity(user?.accessToken, dispatch, cart.id)
        }
        else {
            openNotification('Bạn không thể thêm quá số lượng có sẵn', 'error')
        }

    }
    const handleRemoveCart = (cart) => {
        removeCart(user?.accessToken, dispatch, cart.id)
    }
    const handleGoCheckout = () => {
        navigate('/checkout', { state: { selectedRows } })
    }
    return (
        <div className="page-container">
            <div className="wrapper">
                {
                    (allCart?.length) //Đkiên array giỏ hàng >0
                        ?
                        <>
                            <h3 style={{ padding: 10, margin: '20px 0' }}>Giỏ hàng</h3>
                            <TableCart handleSelectionChange={handleSelectionChange} allCart={allCart} handleRemoveCart={handleRemoveCart} handleIncreaseQuantity={handleIncreaseQuantity} handleDecreaseQuantity={handleDecreaseQuantity} />
                            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: 10 }}>
                                <Button className={(selectedRows.length) ? 'button btn-primary' : 'button not-allowed'}
                                    onClick={() => handleGoCheckout()}
                                    disabled={(selectedRows.length) ? false : true}
                                >
                                    Mua hàng
                                </Button>
                            </div>
                        </>
                        :
                        <Empty type='cart' />
                }

            </div>
        </div >
    )
}

export default CartPage;