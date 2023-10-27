import Button from "../../../UI/Button";
import { useState } from "react";
const FilterSide = () => {

    const [priceFrom, setPriceFrom] = useState('')
    const [priceTo, setPriceTo] = useState('')
    console.log(priceFrom
        , priceTo)
    return (
        <div className="filter">
            <div className="">
                <div className="title">
                    <span>Filter</span>
                    <i className="fa-solid fa-filter fa-md"></i>
                </div>
                <div className="filter-name">
                    <div className="brand">
                        <span>Nike</span>
                        <i className="fa-2xs fa-solid fa-chevron-right"></i>
                    </div>
                    <div className="brand">
                        <span>Adidas</span>
                        <i className="fa-2xs fa-solid fa-chevron-right"></i>
                    </div>
                    <div className="brand">
                        <span>Converse</span>
                        <i className="fa-2xs fa-solid fa-chevron-right"></i>
                    </div>
                    <div className="brand">
                        <span>Vans</span>
                        <i className="fa-2xs fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="title">
                    <span>Price</span>
                    <i className=" fa-solid fa-chevron-down"></i>


                </div>
                <div className="filter-price">
                    <input type="text" placeholder="From" value={priceFrom}
                        onChange={event => {
                            const re = /^[0-9\b]+$/;
                            if (event.target.value === '' || re.test(event.target.value)) {
                                setPriceFrom(event.target.value)
                            }
                        }} />
                    <span>-</span>
                    <input type="text" placeholder="To" value={priceTo}
                        onChange={event => {
                            const re = /^[0-9\b]+$/;
                            if (event.target.value === '' || re.test(event.target.value)) {
                                setPriceTo(event.target.value)
                            }
                        }} />
                </div>
            </div>
            <div className="">
                <div className="title">
                    <span>Size</span>
                    <i className=" fa-solid fa-chevron-down"></i>

                </div>
                <div className="filter-size">
                    <Button className="size button">38</Button>
                    <Button className="size button">39</Button>
                    <Button className="size button">40</Button>
                    <Button className="size button">41</Button>
                    <Button className="size button">42</Button>
                    <Button className="size button">43</Button>
                    <Button className="size button">44</Button>
                    <Button className="size button">45</Button>
                </div>
            </div>
            <div className="">
                <div className="title">
                    <span>Color</span>
                    <i className=" fa-solid fa-chevron-down"></i>
                </div>
                <div className="filter-color"></div>
            </div>
        </div >
    );
}

export default FilterSide;