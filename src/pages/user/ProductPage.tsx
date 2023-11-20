import { useParams } from "react-router-dom";
import CardShoe from "../../components/pages/user/Body/CardShoe";
import useFetch from "../../hooks/useFetch";
import NotFound from "./NotFound";
import { BASE_URL } from "../../config";
import Loading from "../../components/UI/Loading";
const ProductPage = () => {
    const { slug } = useParams()
    const { data, isLoading } = useFetch(`${BASE_URL}/${slug}`)

    if (isLoading) {
        return <Loading />
    }
    else return (
        <div className="page-container">
            <div className="wrapper">
                <div className="product">
                    {data.map((item: any, index: number) => {
                        // console.log(item)
                        return (
                            <CardShoe data={item} key={index} />
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductPage;