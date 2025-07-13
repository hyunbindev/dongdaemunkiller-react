import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import NewsTopicThumbNail from '../tumb/NewsTopicThumbNail';
import style from './NewsTopicCarousel.module.css'

import 'swiper/css';
import 'swiper/css/autoplay';
import './carousel.css'
import 'swiper/css/pagination';

const NewsTopicCarousel = ()=>{
    return(
        <div className={style.carousel}>
            <h2>「東大門 現場르포 — 熱氣 가득한 通路의 오늘」</h2>
            <Swiper  className="topic-carousel" modules={[Autoplay, Pagination]} spaceBetween={5} centeredSlides={true} slidesPerView={1.2} pagination={{ clickable: true }}>
                <SwiperSlide>
                    <NewsTopicThumbNail/>
                </SwiperSlide>
                <SwiperSlide>
                    <NewsTopicThumbNail/>
                </SwiperSlide>
                <SwiperSlide>
                    <NewsTopicThumbNail/>
                </SwiperSlide>
                <SwiperSlide>
                    <NewsTopicThumbNail/>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
export default NewsTopicCarousel;