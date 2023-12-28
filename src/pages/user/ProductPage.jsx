import { useEffect } from 'react'
import { useParams, useSearchParams } from "react-router-dom";
import CardShoe from "../../components/pages/user/Body/CardShoe";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../config";
import Loading from "../../components/UI/Loading";
import FilterSide from '../../components/pages/user/Body/FilterSide';
const ProductPage = () => {
    const { slug } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    const { data, isLoading } = useFetch(`${BASE_URL}/allProducts/${slug ? slug : ''}`)
    const filterData = data.filter((item) => {
        if (category && brand) {
            return item.category == category && item.brand == brand
        }
        else if (category && brand == '' || category) {
            return item.category == category
        }
        else if (brand && category == '' || brand) {
            return item.brand == brand
        }
        else {
            return item
        }
    })
    // console.log('filterData', filterData)
    if (isLoading) {
        return <Loading />
    }
    else return (
        <div className="page-container">
            <div className="wrapper d-flex" >
                <div className="col-xxl-3" >
                    <FilterSide slug={slug} searchParams={searchParams} setSearchParams={setSearchParams} />
                </div>
                <div className="col-xxl-9">
                    <div className="product">
                        {filterData?.map((item, index) => {
                            // console.log(item)
                            return (
                                <CardShoe data={item} key={index} />
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;