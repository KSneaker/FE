import Header from "../../pages/user/Header";
import Footer from "../../pages/user/Footer";
import { useEffect, useState } from "react";

const UserContent = ({ children }) => {
    // const [scrollTop, setScrollTop] = useState(0);

    // useEffect(() => {
    //     const handleScroll = event => {
    //         setScrollTop(window.scrollY);
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <div className="App">
            <header id="header">
                <Header login={false} />
            </header>
            <main id="main">
                {children}
            </main>
            <footer id="footer">
                <Footer />
            </footer>
            {/* {(scrollTop > 10 ? <button onClick={() => {
                window.scrollTo({
                    top: 0,
                    left: 0
                });
            }}>lên</button> : null)} */}
        </div>
    );
}

export default UserContent;