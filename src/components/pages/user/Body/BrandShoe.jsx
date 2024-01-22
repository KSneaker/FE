import Button from "../../../UI/Button";
import { useNavigate, } from "react-router-dom";
import CardShoe from "./CardShoe";
import { BASE_URL } from "../../../../config";
import useFetch from "../../../../hooks/useFetch";
const BrandShoe = (props) => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = props.name;
        navigate(`allProducts/${path}`);
    }
    const { data: data } = useFetch(`${BASE_URL}/home/${props.name}`)
    // console.log('>>data', data)

    return (
        <div>
            <div className="brand">
                <span style={{ textTransform: 'capitalize' }}>Giày {props.name}</span>
                <Button className="button see-all" onClick={routeChange}>
                    <span>Xem tất cả </span>
                    <i className="fa-solid fa-chevron-right fa-2xs"></i>
                </Button>
            </div>
            <div className="product">
                {data?.map((item, index) => {
                    return (
                        <CardShoe homepage={true} data={item} key={index} />
                    )
                }
                )}
            </div>

        </div>
    );
}

export default BrandShoe;