import style from './NewsTopicThumbNail.module.css'
import { NewsResponseInterface } from '../../../../data/NewsInterface'
import { useNavigate } from 'react-router-dom';

import news_default_image from '../../../../assets/news_paper.jpg';

interface NewsTopicThumbNailProps {
    news : NewsResponseInterface;
}

const NewsTopicThumbNail:React.FC<NewsTopicThumbNailProps> = ({news})=>{
    const navigate = useNavigate();

    return(
        <div className={style.topicThumb} onClick={()=>{navigate(`/news/${news.id}`)}}>
            <img src={news.imageUrl ?  news.imageUrl : news_default_image}/>
            <div className={style.content}>
                <h3>{news.title}</h3>
                <p>{news.text}</p>
            </div>
        </div>
    )
}
export default NewsTopicThumbNail;