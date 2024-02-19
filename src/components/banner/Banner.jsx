import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../assets/styles/styles.css'

import slide1 from "../../assets/images/banner/converse.jpg";
import slide2 from "../../assets/images/banner/banner2.webp"
const Banner = () => (
    <Swiper
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        // spaceBetween={0}
        loop={true}
        // autoplay={{
        //     delay: 3000,
        //     disableOnInteraction: false,
        // }}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
    // // scrollbar={{ draggable: true }}
    // onSwiper={(swiper: any) => console.log(swiper)}
    // onSlideChange={() => console.log('slide change')}
    >
        <SwiperSlide>
            <img className='banner' src={slide2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img className='banner' src={slide1} alt="" />
        </SwiperSlide>
        {/* <SwiperSlide>
            <img className='banner' src={slide1} alt="" />
        </SwiperSlide> */}
    </Swiper>

);

export default Banner;