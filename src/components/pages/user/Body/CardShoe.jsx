import { Link, useNavigate } from "react-router-dom";
import Button from "../../../UI/Button";
import VND from "../../../../functions/VND";
import { useDispatch, useSelector } from "react-redux";
import { postWishlist } from "../../../../redux/actions/actionsWishlist";

const CardShoe = ({ data, homepage }) => {
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
    return (
        <div className={homepage ? `col-xxl-3 col-md-6 container-product` : `col-xxl-4 col-md-6 container-product`}>
            <div className="card-wrapper" >
                <Button className=" button heart" onClick={() => handleAddToWishlist(data)}>
                    <i className="fa-regular fa-heart" ></i>
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
                            <div className="d-flex" style={{ gap: 20 }}>
                                <Button className="price button">{VND.format(data.price - data.price * data.discount / 100)}</Button>
                                {/* <Button className="price button" disabled> -{data.discount}%</Button> */}

                                {/* <Button className="price button">{data.price}</Button> */}

                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default CardShoe;