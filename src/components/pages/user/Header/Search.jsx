import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Search = () => {
    const allProducts = useSelector((state) => state.products.products?.allProducts)
    // console.log(allProducts)
    const [searchInput, setSearchInput] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(false)
    // const debounceSearchInput = useDebounce(searchInput, 500)
    // const { data: data } = useFetch(`${BASE_URL}/product?searchValue=${debounceSearchInput}`)
    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }
    return (

        <div className="search-input col-sm-4 col-md-6 col-lg-2 col-xl-2" onFocus={() => { setShowSearchResult(true) }} onBlur={() => { setShowSearchResult(false) }} >
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Tìm kiếm..." className="input" value={searchInput}
                onChange={handleSearch} />
            {
                searchInput && showSearchResult ?
                    <ul className="search-result" onMouseDown={() => { setShowSearchResult(true) }}>
                        <li>
                            <button onClick={() => { console.log(';') }}>OK</button>
                        </li>
                        <li>

                            <button onClick={() => { console.log(';') }}>OK</button>
                        </li>
                    </ul>
                    : null
            }
        </div>
    );
}

export default Search;