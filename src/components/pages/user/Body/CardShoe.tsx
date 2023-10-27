import { Link } from "react-router-dom";
import Button from "../../../UI/Button";
import VND from "../../../../functions/VND";
const CardShoe = ({ data }: any) => {
    // console.log(data)
    return (
        <div className="col-xl-3 col-lg-4 col-md-6 container">
            <div className="card-wrapper" >
                <Button className=" button heart" onClick={() => {
                    console.log('add wishlist');
                }}>
                    {true ?
                        <i className="fa-regular fa-heart" ></i>
                        :
                        <i className="fa-solid fa-heart" style={{ color: 'red' }}></i>}
                </Button>
                <Link to={`/product/${data.id}`} >
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
                                {/* <Button className="price button"> -{data.discount}%</Button>
                                <Button className="price button">{data.price}</Button> */}

                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default CardShoe;