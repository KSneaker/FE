import Header from "../../pages/user/Header";
import Footer from "../../pages/user/Footer";
const LoginContent = ({ children }) => {
    return (
        <div className="App">
            <header id="header">
                <Header login={true} />
            </header>
            <main id="main">
                {children}
            </main>
            <footer id="footer">
                <Footer />
            </footer>
        </div>
    );
}

export default LoginContent;