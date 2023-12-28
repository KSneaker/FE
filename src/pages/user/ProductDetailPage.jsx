
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import 'swiper/css/scrollbar';
import Button from '../../components/UI/Button';
import { useState } from 'react';
import { Modal, Rate, Spin } from 'antd';
import Divider from '../../components/UI/Divider';
import ListThumbs from '../../components/pages/user/Body/ListThumbs';
import TabDetail from '../../components/pages/user/Body/TabDetail';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import VND from '../../functions/VND';
import { BASE_URL } from '../../config';
import Loading from '../../components/UI/Loading';
import ListSizes from '../../components/pages/user/Body/ListSizes';
import { useDispatch, useSelector } from 'react-redux';
import { postWishlist } from '../../redux/actions/actionsWishlist';
import { postCart } from '../../redux/actions/actionsCart';
import { openNotification } from '../../functions/Notification';
import axios from 'axios';
const ProductDetailPage = () => {
    const param = useParams()
    const { data, isLoading } = useFetch(`${BASE_URL}/product/${param.id}`)
    const { data: dataComment } = useFetch(`${BASE_URL}/product/comments/${param.id}`)
    const dataDetail = data[0];
    const [sizeActive, setSizeActive] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const user = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleAddToWishlist = async (data) => {
        if (!user?.accessToken) {
            navigate('/sign-in')
        } else {
            const body = {
                product_id: data.id,
                user_id: user.user.id
            }
            postWishlist(user?.accessToken, dispatch, body)
        }
    }
    const handleAddToCart = async (data) => {
        if (!user?.accessToken) {
            navigate('/sign-in')
        } else {
            if (!sizeActive) {
                openNotification('Vui lòng chọn size', 'warning')
            }
            else {
                const body = {
                    size: sizeActive,
                    product_id: data.id,
                    user_id: user.user.id
                }
                // console.log(body)
                postCart(user?.accessToken, dispatch, body)
            }

        }
    }
    if (isLoading) {
        return <Loading />
    }
    else return (
        <div className="page-container">
            <div className="wrapper">
                <div className="product-detail-page">
                    <div className="detail row">
                        <div className="col-lg-6  col-sm-12" >
                            <ListThumbs productID={dataDetail?.id} />
                        </div>
                        <div className="col-lg-6  col-sm-12" >
                            <div className="product-information">
                                <div>
                                    <div className="product-name">
                                        <span>{dataDetail?.title} </span>
                                    </div>
                                    <div className="product-rate">
                                        <span style={{ marginRight: 10, color: '#fadb14', fontSize: 18 }}>
                                            {
                                                dataComment.length ?
                                                    <>
                                                        {(dataComment?.reduce((total, item) => (total + item.rating), 0)) / dataComment?.length}
                                                    </>
                                                    : <>Chưa có đánh giá</>
                                            }
                                        </span>
                                        <Rate disabled allowHalf defaultValue={(dataComment?.reduce((total, item) => (total + item.rating), 0)) / dataComment?.length} />
                                    </div>
                                </div>
                                <Divider />
                                <div className="product-price">
                                    <span className='actual-price text-price' >
                                        {VND.format(dataDetail?.price - dataDetail?.price * dataDetail?.discount / 100)}
                                    </span>
                                    <span className='old-price text-price'>
                                        {VND.format(dataDetail?.price)}
                                    </span>
                                    <span className='actual-price text-price' style={{ fontSize: 16 }}>
                                        {`-${dataDetail?.discount}%`}
                                    </span>
                                </div>

                                <div className="product-size">
                                    <div className='size' >
                                        <span className="text">Chọn size</span>
                                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={700} centered >
                                            <img style={{ width: '100%' }} src="https://www.soleracks.com/wp-content/uploads/2016/10/Nike-Shoes-Size-Chart-Conversion-unisex-men-women.png" alt="" />
                                        </Modal>
                                        <span className='text guide' onClick={showModal}>Hướng dẫn chọn size</span>

                                        <i className="fa-solid fa-chevron-right fa-xs"></i>

                                    </div>
                                    <div className="options">
                                        <ListSizes productID={dataDetail?.id} sizeActive={sizeActive} setSizeActive={setSizeActive} />
                                    </div>
                                </div>
                                <div className="product-add-to-cart">
                                    <Button className='button btn-add-to-cart btn-primary ' onClick={() => handleAddToWishlist(dataDetail)}>
                                        <i className="fa-regular fa-heart"></i>
                                        <span className='text' >
                                            Thêm vào yêu thích
                                        </span>
                                    </Button>
                                    <Button className='button btn-add-to-cart btn-primary' onClick={() => handleAddToCart(dataDetail)}>
                                        <i className="fa-solid fa-cart-shopping"></i>

                                        <span className='text' >
                                            Thêm vào giỏ hàng
                                        </span>
                                    </Button>
                                </div>
                                <Divider />
                                <div className="product-about">
                                    <div className="about">
                                        <Button className='button' disabled={true} style={{ color: '#000' }}>
                                            <i className="fa-solid fa-credit-card  fa-md"></i>
                                        </Button>
                                        Thanh toán an toàn
                                    </div>
                                    <div className="about">
                                        <Button className='button' disabled={true} style={{ color: '#000' }}>
                                            <i className="fa-solid fa-truck  fa-md"></i>
                                        </Button>
                                        Giao hàng nhanh
                                    </div>

                                    <div className="about">
                                        <Button className='button' disabled={true} style={{ color: '#000' }}>
                                            <i className="fa-solid fa-repeat  fa-md"></i>
                                        </Button>
                                        Miễn phí vận chuyển & hoàn trả
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="description-reviews">
                    <TabDetail dataDetail={dataDetail} dataComment={dataComment} />
                </div>
            </div>

        </div >
    );

}

export default ProductDetailPage;