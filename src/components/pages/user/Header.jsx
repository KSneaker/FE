import { useEffect } from 'react'
import NavBar from "./Header/NavBar";
import '../../../assets/styles/styles.css'
import Brand from "./Header/Brand";
import User from "./Header/User";
import Search from "./Header/Search";
import Menu from "./Header/Menu";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
const Header = ({ login }) => {
    const { width } = useWindowDimensions();
    // console.log(width)
    useEffect(() => {
        // console.log('render')
    }, [])
    if (login) {
        return (
            <div className="page-container navbar wrapper">
                <Brand height={60} />
                <a href="#" style={{ color: '#000' }}>Bạn cần hỗ trợ?</a>
            </div>
        )
    }
    else if (width <= 576) {
        return (
            <div className="page-container navbar wrapper">
                <Brand height={60} />
                {/* <NavBar /> */}
                {/* <Search /> */}
                {/* <User /> */}

                <Menu />
            </div>
        );
    }
    else if (width <= 768) {
        return (
            <div className="page-container navbar wrapper">
                <Brand height={60} />
                {/* <NavBar /> */}
                <Search />
                {/* <User /> */}
                <Menu />
            </div>
        );
    }
    else if (width <= 992) {
        return (
            <div className="page-container navbar wrapper">
                <Brand height={60} />
                {/* <NavBar /> */}
                <Search />
                <User />
                {/* <Menu /> */}
            </div>
        );
    }
    else return (
        <div className="page-container navbar wrapper">
            <Brand height={60} />
            <NavBar />
            <Search />
            <User />
        </div>
    );

}

export default Header;
