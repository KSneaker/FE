
const Footer = () => {
    return (
        <div className="page-container wrapper">
            <div className="about row">
                <div className=" col-lg-3 col-sm-6 col-12 ">
                    <span className="title" >Chăm sóc khách hàng</span>
                    <ul>
                        <li>Trung Tâm Trợ Giúp</li>
                        <li>Trả hàng & Hoàn tiền</li>
                        <li>Câu hỏi thường gặp</li>
                    </ul>
                </div>
                <div className=" col-lg-3 col-sm-6 col-12">
                    <span className="title">Công ty</span>
                    <ul>
                        <li>Về chúng tôi</li>
                        <li>Blog</li>
                        <li>Hợp tác</li>
                        <li>Phương tiện truyền thông</li>
                    </ul>
                </div>
                <div className=" col-lg-3 col-sm-6 col-12">
                    <span className="title">Thông tin chi tiết</span>
                    <ul>
                        <li>Điều khoản và điệu kiện</li>
                        <li>Chính sách bảo mật</li>
                        <li>Chính sách vận chuyển</li>
                    </ul>
                </div>
                <div className=" col-lg-3 col-sm-6 col-12">
                    <span className="title">Liên hệ</span>
                    <ul>
                        <li>support.ksneaker@gmail.com</li>
                        <li>175 Tây Sơn, Hà Nội, Việt Nam</li>
                    </ul>
                </div>
            </div >
            <div className="copyright">
                © 2023 KSneakers. Tất cả các quyền được bảo lưu.
            </div>
        </div >
    );
}

export default Footer;
