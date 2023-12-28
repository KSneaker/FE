
import { useState } from 'react'
import Button from '../../../UI/Button';
import { BASE_URL } from '../../../../config';
import useFetch from '../../../../hooks/useFetch';

const ListSizes = ({ productID, setSizeActive, sizeActive }) => {
    const { data: dataSize, isLoading } = useFetch(`${BASE_URL}/size/${productID}`)
    // console.log(dataSize)
    const quantity = dataSize?.filter((item) => {
        return item.size === sizeActive
    })[0]
    return (
        <>
            {
                dataSize?.map((curSize, index) => {
                    return (
                        <Button
                            key={index}
                            onClick={() => setSizeActive(curSize.size)}
                            className={sizeActive === curSize.size ? 'button active' : 'button ' + (curSize.quantity === 0 ? 'not-allowed' : null)}
                            disabled={curSize.quantity === 0 ? true : false}
                        >
                            {curSize.size}
                        </Button>
                    )
                })
            }
            {
                sizeActive ?
                    <>
                        Số lượng có sẵn : {quantity.quantity}
                    </>
                    : null
            }

        </>
    );
}

export default ListSizes;