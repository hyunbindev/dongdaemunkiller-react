import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import NewsTopicThumbNail from '../tumb/NewsTopicThumbNail';
import style from './NewsTopicCarousel.module.css'

import 'swiper/css';
import 'swiper/css/autoplay';
import './carousel.css'
import 'swiper/css/pagination';
import useNews from '../../../../hooks/useNews';
import { NewsResponseInterface } from '../../../../data/NewsInterface';

interface NewsTopicCarouselProps {
    newsRank : NewsResponseInterface[];
}

const NewsTopicCarousel:React.FC<NewsTopicCarouselProps> = ({newsRank})=>{
    return(
        <div className={style.carousel}>
            <h2>「東大門 現場르포」</h2>
            <Swiper  className="topic-carousel" modules={[Autoplay, Pagination]} spaceBetween={5} centeredSlides={true} slidesPerView={1.2} pagination={{ clickable: true }}>
                {newsRank.map((item, index) => (
                    <SwiperSlide key={index}>
                        <NewsTopicThumbNail news={item}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
export default NewsTopicCarousel;