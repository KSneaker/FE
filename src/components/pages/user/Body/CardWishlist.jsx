import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../../UI/Button";
import VND from "../../../../functions/VND";
import { removeWishlist } from "../../../../redux/actions/actionsWishlist";

const CardWishlist = ({ data }) => {
    const user = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch();
    const handleRemoveFromWishlist = async (wishlist_id) => {
        // console.log('remove')
        removeWishlist(user?.accessToken, dispatch, wishlist_id)
    }
    return (
        <div className="col-xl-3 col-lg-4 col-md-6 container-product">
            <div className="card-wrapper" >
                <Button className=" button heart" onClick={() => handleRemoveFromWishlist(data.wishlist_id)}>
                    <i className="fa-regular fa-trash-can"></i>
                </Button>
                <Link to={`/product/${data.id}`}  >
                    <div className="card">
                        <div className="image">
                            <img src={data.thumbnail} alt="" />
                        </div>
                        <div className="details">
                            <div>
                                <p className="name">{data.title}</p>
                            </div>
                            <div>
                                <Button className="price button">{VND.format(data.price - data.price * data.discount / 100)}</Button>

                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default CardWishlist;