import Banner from "../../components/banner/Banner";
import BrandShoe from "../../components/pages/user/Body/BrandShoe";
const HomePage = () => {
    return (
        <>
            <Banner />
            <div className="page-container">
                <div className="wrapper">
                    <div className="home-page">
                        <BrandShoe name='nike' />
                        <BrandShoe name='adidas' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;