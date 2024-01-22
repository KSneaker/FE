import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Button from "./Button";
import { ShoppingCartOutlined } from '@ant-design/icons';
const Empty = ({ type }) => {
    const { height } = useWindowDimensions();
    const navigate = useNavigate()
    return (
        <div className="" style={{ display: 'flex', gap: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: height * 0.8 }}>
            <div className="" style={{ display: 'flex', height: height * 0.2, width: height * 0.2, borderRadius: '100%', backgroundColor: '#F0F9F4', justifyContent: 'center', alignItems: 'center' }}>
                {(() => {
                    switch (type) {
                        case 'wishlist': return <i className="fa-regular fa-heart" style={{ fontSize: 50 }}></i>;
                        case 'cart': return <ShoppingCartOutlined style={{ fontSize: '50px' }} />;
                        case 'checkout': return <i class="fa-solid fa-check" style={{ fontSize: 50 }}></i>;
                        default: return;
                    }
                })()}

            </div>
            {(() => {
                switch (type) {
                    case 'wishlist': return <>
                        <h3>Danh sách yêu thích của bạn đang trống</h3>
                        <p>Bạn chưa có sản phẩm nào trong danh sách yêu thích. Bạn sẽ tìm thấy rất nhiều sản phẩm thú vị trên trang Cửa hàng của chúng tôi</p>
                    </>
                    case 'cart': return <>
                        <h3>Giỏ hàng của bạn đang trống</h3>
                        <p>Bạn chưa có sản phẩm nào trong giỏ hàng. Bạn sẽ tìm thấy rất nhiều sản phẩm thú vị trên trang Cửa hàng của chúng tôi</p>
                    </>
                    case 'checkout': return <>
                        <h3>Đơn hàng của bạn đã được đặt thành công</h3>
                    </>;

                    default: return;
                }
            })()}
            <Button onClick={() => { navigate('/') }} className="button btn-primary">Đi đến trang chủ</Button>
        </div>
    );

}

export default Empty;