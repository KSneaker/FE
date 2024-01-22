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
        <div className="filter-side">
            <Menu
                mode="inline"
                items={(slug == 'allProducts') ? itemsAll : itemsBrand}
                style={{ borderRadius: 6 }}
            />
            <div className="button btn-primary" onClick={() => setSearchParams()}><span style={{ fontSize: 12 }}>Clear Filter</span></div>
        </div>

    );
}

export default FilterSide;