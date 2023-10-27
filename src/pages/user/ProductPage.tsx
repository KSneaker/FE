import { useParams } from "react-router-dom";
import CardShoe from "../../components/pages/user/Body/CardShoe";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import NotFound from "./NotFound";
const ProductPage = () => {
    const { slug } = useParams()
    const { data } = useFetch(`http://localhost:8080/${slug}`)

    if (data.length !== 0) {
        return (
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
    else return <NotFound />
}

export default ProductPage;