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
    const { data, isLoading } = useFetch(`${BASE_URL}/allProducts/${slug ? slug : ''}`)
    const filterData = data.filter((item) => {
        if (category) {
            return item.category == category
        }
        else {
            return item
        }
    })
    // console.log('filterData', filterData)
    return isLoading
        ?
        <Loading />
        :
        <div className="page-container">
            <div className="wrapper d-flex" >
                <div className="col-xxl-3" >
                    <FilterSide slug={slug} searchParams={searchParams} setSearchParams={setSearchParams} />
                </div>
                <div className="col-xxl-9">
                    <h1 style={{ padding: 10, fontSize: 20 }}>
                        Toàn bộ sản phẩm <span style={{ textTransform: 'capitalize' }}>
                            {slug}
                        </span>
                        {category && <> - {category}</>}
                        : {filterData?.length}
                    </h1>
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

}

export default ProductPage;