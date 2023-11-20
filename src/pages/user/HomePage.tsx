import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../components/banner/Banner";
import BrandShoe from "../../components/pages/user/Body/BrandShoe";
import { getAllBrands } from "../../redux/actions/actionsBrand";
const HomePage = () => {
    // const user = useSelector((state: any) => state.auth.login?.currentUser)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     getAllBrands(user?.accessToken, dispatch)
    // }, [])
    // const allBrands = useSelector((state: any) => state.brands.brands?.allBrands?.data)
    // console.log(allBrands)
    return (
        <>
            <Banner />
            <div className="page-container">
                <div className="wrapper">
                    <div className="home-page">
                        {/* {
                            allBrands.map((brand: any) => {
                                return (
                                    <BrandShoe key={brand.id} name={brand.name} />

                                )
                            })
                        } */}
                        <BrandShoe name='nike' />
                        <BrandShoe name='adidas' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;