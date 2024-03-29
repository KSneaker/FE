import { memo, useCallback, useEffect, useState } from 'react';
import FormCheckout from '../../components/Form/FormCheckout';
import Button from '../../components/UI/Button';
import VND from '../../functions/VND';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Radio, Input } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { openNotification } from '../../functions/Notification';
import dayjs from 'dayjs';

const CheckoutPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser)
    const location = useLocation()
    const navigate = useNavigate()
    const selectProducts = location.state.selectedRows;
    const [discount, setDiscount] = useState({
        code: '',
        discount: 0,
        name: "",
        product: ''
    })
    const [voucherValue, setVoucherValue] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [formInfo] = Form.useForm();
    const subTotalMoney = selectProducts?.reduce((total, product) => total + product.price * product.quantity, 0)
    const listProductAddVoucher = selectProducts.filter((item) => discount.product?.includes(`${item.product_id}`))
    const discountMoney = listProductAddVoucher.reduce((total, product) => total + product.price * product.quantity, 0) * discount.discount / 100
    const totalMoney = subTotalMoney - discountMoney
    const handleInputChange = useCallback((event) => {
        setVoucherValue(event.target.value);
    }, [])
    const hanldleAddVoucher = async () => {
        if (voucherValue) {
            const res = await axios.get(`${BASE_URL}/voucher/check-voucher/${voucherValue}`)
            if (res.data.valid) {
                if (selectProducts.filter((item) => res.data.data.product?.includes(`${item.product_id}`)).length)
                    setDiscount({
                        code: res.data.data.code,
                        discount: res.data.data.discount,
                        name: res.data.data.name,
                        product: res.data.data.product
                    })

                else {
                    openNotification('Mã giảm giá không phù hợp', 'error')
                }
            }
            else {
                openNotification(res.data.message, 'error')
            }

        }
    }
    const handleRemoveVoucher = () => {
        setDiscount({
            code: '',
            discount: 0,
            name: ""
        })
        setVoucherValue('')
    }
    const handleCheckout = () => {
        formInfo
            .validateFields()
            .then(async (values) => {

                if (paymentMethod === 'cod') {
                    try {
                        const body = {
                            ...values,
                            user_id: user.user.id,
                            payment_method: paymentMethod,
                            total_money: totalMoney,
                            order_code: `KS${dayjs().format('YYMMDDhhmmss')}`
                        };
                        const res = await axios.post(`${BASE_URL}/orders`, body, {
                            headers: {
                                token: `Bearer ${user.accessToken}`
                            }
                        });
                        if (res.data.id) {
                            for (let i = 0; i < selectProducts.length; i++) {
                                // console.log(i, selectProducts[i])
                                const bodyDetail = {
                                    order_id: res.data.id,
                                    product_id: selectProducts[i].product_id,
                                    price: discount.product?.includes(`${selectProducts[i].product_id}`) ? selectProducts[i].price * (1 - discount.discount / 100) : selectProducts[i].price,
                                    quantity: selectProducts[i].quantity,
                                    size: selectProducts[i].size
                                }
                                const bodyDecreaseSize = {
                                    product_id: selectProducts[i].product_id,
                                    size: selectProducts[i].size
                                }

                                console.log('bodyDecreaseSize>>>>>', bodyDecreaseSize)
                                // console.log(body)
                                const res1 = await axios.post(`${BASE_URL}/orders/order-details`, bodyDetail, {
                                    headers: {
                                        token: `Bearer ${user.accessToken}`
                                    }
                                });
                                const res2 = await axios.delete(`${BASE_URL}/cart/${selectProducts[i].id}`, {
                                    headers: {
                                        token: `Bearer ${user.accessToken}`
                                    }
                                })
                                const res3 = await axios.post(`${BASE_URL}/orders/decrease`, bodyDecreaseSize, {
                                    headers: {
                                        token: `Bearer ${user.accessToken}`
                                    }
                                })
                            }
                        }

                        navigate(`/payment?method=cod&order_code=${`KS${dayjs().format('YYMMDDhhmmss')}`}`)

                    }
                    catch (error) {
                        console.log(error)
                    }
                }
                else {
                    const order_code = `KS${dayjs().format('YYMMDDhhmmss')}`
                    const body = {
                        ...values,
                        user_id: user.user.id,
                        payment_method: paymentMethod,
                        total_money: totalMoney,
                        order_code: order_code,
                        status: 5
                    };
                    const res = await axios.post(`${BASE_URL}/orders`, body, {
                        headers: {
                            token: `Bearer ${user.accessToken}`
                        }
                    });
                    if (res.data.id) {
                        for (let i = 0; i < selectProducts.length; i++) {
                            // console.log(i, selectProducts[i])
                            const bodyDetail = {
                                order_id: res.data.id,
                                product_id: selectProducts[i].product_id,
                                price: discount.product?.includes(`${selectProducts[i].product_id}`) ? selectProducts[i].price * (1 - discount.discount / 100) : selectProducts[i].price,
                                quantity: selectProducts[i].quantity,
                                size: selectProducts[i].size
                            }
                            const bodyDecreaseSize = {
                                product_id: selectProducts[i].product_id,
                                size: selectProducts[i].size
                            }

                            console.log(body)
                            const res1 = await axios.post(`${BASE_URL}/orders/order-details`, bodyDetail, {
                                headers: {
                                    token: `Bearer ${user.accessToken}`
                                }
                            });
                            const res2 = await axios.delete(`${BASE_URL}/cart/${selectProducts[i].id}`, {
                                headers: {
                                    token: `Bearer ${user.accessToken}`
                                }
                            })
                            const res3 = await axios.post(`${BASE_URL}/orders/decrease`, bodyDecreaseSize, {
                                headers: {
                                    token: `Bearer ${user.accessToken}`
                                }
                            })
                        }
                    }
                    const res2 = await axios.post(`${BASE_URL}/payment/create_payment_url`, {
                        amount: totalMoney,
                        bankCode: '',
                        language: 'vn',
                        order_code: order_code
                    })
                    if (res2.status === 200) {
                        window.location = res2.data
                    }
                }
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };

    return (
        <div className="page-container">
            <div className="wrapper row" style={{ flexDirection: 'row-reverse', marginTop: 10 }}>
                <div className="col-xxl-5 col-xl-6 col-md-6">
                    <div style={{ padding: 20, boxShadow: 'rgba(0, 0, 0, 0.12) 0 0 0 1px', borderRadius: 5 }}>
                        <h5 style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', padding: 10 }}>Tóm tắt đơn hàng</h5>
                        <div className="product-order">
                            <div className='all-order-summary'>
                                {
                                    selectProducts?.map((product) => {
                                        return (
                                            <div className="order-summary" key={product.id}>
                                                <img className="rectangle" alt="Rectangle" src={product.thumbnail} />
                                                <div className='div'>
                                                    <span className="title">{product.title}</span>
                                                    <div className="size-quantity" >
                                                        <span className='size'>
                                                            <span className="text">Size: </span>
                                                            <span className="text-2">{product.size}</span>
                                                        </span>
                                                        <span>
                                                            <span className="text">Số lượng: </span>
                                                            <span className="text-2">{product.quantity}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-wrapper">{VND.format(product.price * product.quantity)}</div>

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="total">
                            <div className="subtotal">
                                <span className="title">Tạm tính:</span>
                                <div className="text-wrapper">
                                    {
                                        VND.format(subTotalMoney)
                                    }
                                </div>

                            </div>
                            {(!discount.code) ?
                                <div className="subtotal">

                                    <div className="">
                                        <span className="title">Mã giảm giá: </span>
                                        <input
                                            type="text" value={voucherValue}
                                            onChange={handleInputChange}
                                            style={{
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                                color: 'rgba(0, 0, 0, 0.88)',
                                                border: '1px solid #d9d9d9',
                                                borderRadius: 6,
                                                padding: '4px 11px'
                                            }} />
                                    </div>
                                    <Button className='button' onClick={hanldleAddVoucher}>
                                        Áp dụng
                                    </Button>
                                </div>
                                :
                                <div className="subtotal">
                                    <span className="title">
                                        Mã giảm giá:
                                        <span style={{ textTransform: 'uppercase' }}>
                                            ({discount.code})
                                        </span>
                                    </span>
                                    <div className="text-wrapper">
                                        -{discount.discount}%
                                    </div>
                                    <Button className='button btn-danger' onClick={handleRemoveVoucher}>
                                        X
                                    </Button>
                                    <div className="text-wrapper">
                                        -{VND.format(discountMoney)}
                                    </div>
                                </div>
                            }

                            {(!discount.code) ?
                                <></>
                                :
                                <div className="subtotal" style={{ alignItems: 'flex-start' }}>
                                    <span className="title">
                                        Sản phẩm áp dụng
                                    </span>
                                    <div >
                                        {listProductAddVoucher?.map((item) => {
                                            return (
                                                <div> {item.title}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            }

                            <div className="subtotal" style={{ border: 'none' }}>
                                <span className="title">Tổng:</span>
                                <div className="text-wrapper" >
                                    {VND.format(totalMoney)}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-7 col-xl-6 col-md-6">
                    <FormCheckout formInfo={formInfo} />
                    <div style={{ padding: 20, boxShadow: 'rgba(0, 0, 0, 0.12) 0 0 0 1px', borderRadius: 5, marginTop: 10 }}>
                        <h5 style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', padding: 10, marginBottom: 10 }}>Hình thức thanh toán</h5>
                        <div className="">
                            <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
                                <Radio value="cod">Thanh toán khi nhận hàng</Radio>
                                <Radio value="vnpay">Thanh toán qua VNPay</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', margin: 10 }}>
                        <Button className='button' onClick={() => handleCheckout()}>Đặt hàng</Button>
                    </div>
                </div>
            </div>
        </div >
    )



}

export default CheckoutPage;