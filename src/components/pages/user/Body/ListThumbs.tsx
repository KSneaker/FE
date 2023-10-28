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
const ListThumbs = ({ productID }: any) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const { data, isLoading } = useFetch(`${BASE_URL}thumb/${productID}`)
    return (
        <div className="product-img row">
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                modules={[Navigation, Thumbs]}
                className="thumbnail"
            >
                {
                    data.map((thumb: any, index: number) => {
                        return (
                            <SwiperSlide key={index}>
                                <img className='thumb' src={thumb.thumbnail} alt="" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                // spaceBetween={10}
                slidesPerView={6}
                spaceBetween={10}
                freeMode={true}
                watchSlidesProgress={false}
                modules={[FreeMode, Thumbs]}
                className='list'
            >
                {
                    data.map((thumb: any, index: number) => {
                        return (
                            <SwiperSlide key={index}>
                                <img className='list-thumb' src={thumb.thumbnail} alt="" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    );

}


export default ListThumbs;