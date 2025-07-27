import style from './NewsElement.module.css'
import sample_img from'../../../assets/example-2.png'
import { useNavigate } from 'react-router-dom';
import { NewsResponseInterface } from '../../../data/NewsInterface';
import { convertDate } from '../../../utils/convertDate';

interface NewsElementProps {
    newsElement:NewsResponseInterface;
}

const NewsElement:React.FC<NewsElementProps> = ({newsElement})=> {
    const navigate = useNavigate();
    return(
        <div className={style.NewsElement} onClick={()=>navigate(`/news/${newsElement.id}`)}>
            {
                newsElement.imageUrl ? <img src={newsElement.imageUrl} className={style.thumb}/> : null
            }
            <div className={style.text}>
                <h2 className={style.title}>{newsElement.title}</h2>
                <div className={style.info}>
                    <div>{newsElement.author.name} 기자</div>
                    <div>{convertDate(newsElement.createdAt)}</div>
                </div>
            </div>
        </div>
    );
}
export default NewsElement;