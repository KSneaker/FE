import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Search = () => {
    const allProducts = useSelector((state) => state.products.products?.allProducts)
    // console.log(allProducts)
    const [searchInput, setSearchInput] = useState('');
    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }
    // console.log(allProducts)
    const fuse = new Fuse(allProducts, {
        keys: ['title', 'description'], // Các trường bạn muốn tìm kiếm
        includeScore: true // Bật tính năng đánh giá kết quả
    });
    const results = fuse.search(searchInput);
    const fuzzyData = searchInput ? results.map(result => result.item) : allProducts;
    console.log('fuzzyData', fuzzyData)
    return (
        <div className="search-input col-sm-4 col-md-6 col-lg-2 col-xl-2"  >
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Tìm kiếm..." className="input" value={searchInput}
                onChange={handleSearch} />
            {
                searchInput &&
                <ul className="search-result" >
                    <span style={{ padding: 10 }}>
                        Kết quả tìm kiếm cho: '{searchInput}'
                    </span>
                    {
                        // allProducts?.filter((item) => item && item.title.toLowerCase().includes(searchInput.toLowerCase())).map((item) => {
                        fuzzyData.map((item) => {
                            return (
                                <li style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                                    <Link onClick={() => { setSearchInput('') }} to={`/product/${item.id}`} style={{ display: 'flex', alignItems: 'center', padding: 5, flex: '2 1 0' }}>
                                        <img width={100} height={100} src={item.thumbnail} alt="" />
                                        {item.title}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    );
}

export default Search;