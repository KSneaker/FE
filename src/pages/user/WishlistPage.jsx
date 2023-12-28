import { useDispatch, useSelector } from 'react-redux';
import { getAllWishlist } from '../../redux/actions/actionsWishlist';
import { useEffect } from 'react';
import CardWishlist from '../../components/pages/user/Body/CardWishlist';
import Empty from '../../components/UI/Empty';
const WishlistPage = () => {

    const user = useSelector((state) => state.auth.login?.currentUser)
    const allWishlist = useSelector((state) => state.wishlist.wishlist?.allWishlist?.data)
    const dispatch = useDispatch()
    useEffect(() => {
        getAllWishlist(user.accessToken, dispatch, user.user.id)
    }, [])

    return (
        <div className="page-container">
            <div className="wrapper">
                {
                    (allWishlist?.length)
                        ?
                        <>
                            <h3 style={{ padding: 10, margin: '20px 0' }}>Danh sách yêu thích</h3>
                            <div className="product" style={{}}>
                                {
                                    allWishlist?.map((item, index) => {
                                        return <CardWishlist data={item} key={index} />
                                    })
                                }
                            </div>
                        </>
                        :
                        <Empty type='wishlist' />
                }
            </div>
        </div>
    );
}

export default WishlistPage;