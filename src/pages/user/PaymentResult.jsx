import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Button from "../../components/UI/Button";
import axios from "axios";
import { BASE_URL } from "../../config";


const PaymentResult = () => {
    const { height } = useWindowDimensions();
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const method = searchParams.get('method')
    const vnpResponseCode = searchParams.get('vnp_ResponseCode')
    const vnp_TxnRef = searchParams.get('vnp_TxnRef')
    const order_code = searchParams.get('order_code')
    console.log(vnpResponseCode == '00')
    if (vnp_TxnRef && vnpResponseCode == '00') {
        axios.put(`${BASE_URL}/orders/${vnp_TxnRef}`, { order_code: vnp_TxnRef, status: '6' })
    }

    return (method == 'cod')
        ?
        <div className="" style={{ display: 'flex', gap: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: height * 0.8 }}>
            <div className="" style={{ display: 'flex', height: height * 0.15, width: height * 0.15, borderRadius: '100%', backgroundColor: '#3ff13f', justifyContent: 'center', alignItems: 'center' }}>
                <i class="fa-solid fa-check" style={{ fontSize: 50, color: 'white' }}></i>
            </div>

            <h3>Đơn hàng {order_code} của bạn đã được đặt thành công</h3>

            <Button onClick={() => { navigate('/') }} className="button btn-primary">Đi đến trang chủ</Button>
        </div>
        :
        (
            (vnpResponseCode === '00' && vnp_TxnRef)
                ?
                <div className="" style={{ display: 'flex', gap: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: height * 0.8 }}>
                    <div className="" style={{ display: 'flex', height: height * 0.15, width: height * 0.15, borderRadius: '100%', backgroundColor: '#3ff13f', justifyContent: 'center', alignItems: 'center' }}>
                        <i class="fa-solid fa-check" style={{ fontSize: 60, color: 'white' }}></i>
                    </div>

                    <h3>Đơn hàng {vnp_TxnRef} của bạn đã được thanh toán thành công</h3>

                    <Button onClick={() => { navigate('/') }} className="button btn-primary">Đi đến trang chủ</Button>
                </div>
                :
                <div className="" style={{ display: 'flex', gap: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: height * 0.8 }}>
                    <div className="" style={{ display: 'flex', height: height * 0.15, width: height * 0.15, borderRadius: '100%', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                        <i class="fa-solid fa-xmark" style={{ fontSize: 60, color: 'white' }}></i>
                    </div>

                    <h3>Đơn hàng {vnp_TxnRef} của bạn chưa được thanh toán</h3>

                    <Button onClick={() => { navigate('/') }} className="button btn-primary">Đi đến trang chủ</Button>
                </div>
        )


}

export default PaymentResult;