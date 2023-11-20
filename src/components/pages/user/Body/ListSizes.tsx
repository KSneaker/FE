
import { useState } from 'react'
import Button from '../../../UI/Button';
import { BASE_URL } from '../../../../config';
import useFetch from '../../../../hooks/useFetch';

const ListSizes = ({ productID }: any) => {
    const [sizeActive, setSizeActive] = useState([])
    const { data: dataSize, isLoading } = useFetch(`${BASE_URL}/size/${productID}`)
    return (
        <>
            {
                dataSize?.map((curSize: any, index: number) => {
                    return (
                        <Button
                            key={index}
                            onClick={() => setSizeActive(curSize.size)}
                            className={sizeActive === curSize.size ? 'button active' : 'button '}>
                            {curSize.size}
                        </Button>
                    )
                })
            }

        </>
    );
}

export default ListSizes;