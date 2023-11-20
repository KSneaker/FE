import Button from "../../../UI/Button";
import { useNavigate } from "react-router-dom";
import CardShoe from "./CardShoe";
import useFetch from "../../../../hooks/useFetch";
import { BASE_URL } from "../../../../config";
const BrandShoe = (props: any) => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = props.name;
        navigate(path);
    }
    const { data: data, isLoading } = useFetch(`${BASE_URL}/${props.name}`)
    // console.log('>>data', data)

    return (
        <div>
            <div className="brand">
                <span style={{ textTransform: 'capitalize' }}>{props.name}</span>
                <Button className="button see-all" onClick={routeChange}>
                    <span>See All</span>
                    <i className="fa-solid fa-chevron-right fa-2xs"></i>
                </Button>
            </div>
            <div className="product">
                {data?.map((item: any, index: number) => {
                    return (
                        <CardShoe data={item} key={index} />
                    )
                }
                )}
            </div>

        </div>
    );
}

export default BrandShoe;