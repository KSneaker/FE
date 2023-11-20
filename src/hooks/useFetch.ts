import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url: any) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url)
                // let data = response.data.data
                // if (data.length == 1) {
                //     data = response.data.data[0];
                // }
                // else {
                //     data = data && response.data ? data : [];
                // }
                let data = response && response.data ? response.data.data : []
                // console.log(data);
                setData(data)
                setIsLoading(false)
            }
            catch (err) {
                console.log((err));
            }
        }
        fetchData();
    }, [url])
    return {
        data,
        isLoading
    }
}
export default useFetch;