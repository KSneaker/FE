import { Menu } from "antd";
import Button from "../../../UI/Button";
import { useEffect } from "react";
import {
    FilterOutlined
} from '@ant-design/icons';
import { Link, useSearchParams } from "react-router-dom";
const FilterSide = ({ searchParams, setSearchParams, slug }) => {
    const itemsAll = [
        {
            key: '1',
            icon: <FilterOutlined />,
            label: 'Thương hiệu',
            children: [
                {
                    key: '11',
                    label: <div className="brand" onClick={(e) => setSearchParams(prev => {
                        prev.set('brand', 'nike')
                        return prev
                    })}>
                        <span>Nike</span>
                    </div>


                },
                {
                    key: '12',
                    label: < div className="brand" onClick={(e) => setSearchParams(prev => {
                        prev.set('brand', 'adidas')
                        return prev
                    })}>
                        <span>Adidas</span>
                    </div >
                }
            ]

        },
        {
            key: '2',
            icon: <FilterOutlined />,
            label: 'Phân loại',
            children: [
                {
                    key: '21',
                    label: <div className="brand" onClick={(e) => setSearchParams(prev => {
                        prev.set('category', 'sneaker')
                        return prev
                    })}>
                        <span>Sneaker</span>
                    </div>


                },
                {
                    key: '22',
                    label: < div className="brand" onClick={(e) => setSearchParams(prev => {
                        prev.set('category', 'running')
                        return prev
                    })}>
                        <span>Running</span>
                    </div >
                }
            ]

        },
    ]
    const itemsBrand = [
        {
            key: '2',
            icon: <FilterOutlined />,
            label: 'Phân loại',
            children: [
                {
                    key: '21',
                    label: <div className="brand" onClick={(e) => setSearchParams(prev => {
                        prev.set('category', 'sneaker')
                        return prev
                    })}>
                        <span>Sneaker</span>
                    </div>


                },
                {
                    key: '22',
                    label: < div className="brand" onClick={(e) => setSearchParams(prev => {
                        prev.set('category', 'running')
                        return prev
                    })}>
                        <span>Running</span>
                    </div >
                }
            ]

        }
    ]
    return (
        // <div className="filter">
        //     <div className="">
        //         <div className="title">
        //             <span>Filter</span>
        //             <i className="fa-solid fa-filter fa-md"></i>
        //         </div>
        //         <div className="filter-name">
        //             <div className="brand">
        //                 <span>Nike</span>
        //                 <i className="fa-2xs fa-solid fa-chevron-right"></i>
        //             </div>
        //             <div className="brand">
        //                 <span>Adidas</span>
        //                 <i className="fa-2xs fa-solid fa-chevron-right"></i>
        //             </div>
        //             <div className="brand">
        //                 <span>Converse</span>
        //                 <i className="fa-2xs fa-solid fa-chevron-right"></i>
        //             </div>
        //             <div className="brand">
        //                 <span>Vans</span>
        //                 <i className="fa-2xs fa-solid fa-chevron-right"></i>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="">
        //         <div className="title">
        //             <span>Size</span>
        //             <i className=" fa-solid fa-chevron-down"></i>

        //         </div>
        //         <div className="filter-size">
        //             <Button className="size button">38</Button>
        //             <Button className="size button">39</Button>
        //             <Button className="size button">40</Button>
        //             <Button className="size button">41</Button>
        //             <Button className="size button">42</Button>
        //             <Button className="size button">43</Button>
        //             <Button className="size button">44</Button>
        //             <Button className="size button">45</Button>
        //         </div>
        //     </div>
        // </div >
        <div className="filter">
            <Menu
                mode="inline"
                items={(slug == 'allProducts') ? itemsAll : itemsBrand}

            />
            <div className="button btn-primary" onClick={() => setSearchParams()}><span style={{ fontSize: 12 }}>Clear Filter</span></div>
        </div>

    );
}

export default FilterSide;