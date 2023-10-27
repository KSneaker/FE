import React, { ReactNode } from "react";
import Header from "../../pages/user/Header";
import Footer from "../../pages/user/Footer";
const UserContent = ({ children }: { children: ReactNode }) => {
    return (
        <div className="App">
            <header id="header">
                <Header />
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

export default UserContent;