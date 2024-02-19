import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import useFetch from '../../../../hooks/useFetch';
import { BASE_URL } from '../../../../config';
import Loading from '../../../UI/Loading';
const ListThumbs = ({ productID }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { data, isLoading } = useFetch(`${BASE_URL}/thumb/${productID}`)
    const modifiedData = data.map((item) => {
        return {
            ...item,
            thumbnail: `${BASE_URL}/image/${item.thumbnail}`
        }
    })
    return isLoading ? <Loading />
        :
        <div className="product-img row">
            <Swiper
                spaceBetween={10}
                navigation={true}
                // loop={true}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbnail"
            >
                {
                    modifiedData?.map((thumb, index) => {
                        return (
                            <SwiperSlide key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                <img className='thumb' src={thumb.thumbnail} alt="" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                style={{ textAlign: 'center' }}
                slidesPerView={6}
                spaceBetween={10}
                freeMode={true}
                // watchSlidesProgress={true}
                className='list'
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {
                    modifiedData?.map((thumb, index) => {
                        return (
                            <SwiperSlide key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                <img className='list-thumb' src={thumb.thumbnail} alt="" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>

}


export default ListThumbs;