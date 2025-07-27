import { useNavigate } from 'react-router-dom';
import { NewsResponseInterface } from '../../../data/NewsInterface';
import NewsElement from './NewsElement';
import style from './newslist.module.css'

interface NewsListProps{
    news : NewsResponseInterface[];
}

const NewsList:React.FC<NewsListProps> = ({news})=>{
    const navigate = useNavigate();
    return(
        <div>
            {
                news.map((item, index) => (
                    <div key={item.id} onClick={() => navigate(`/news/${item.id}`)}>
                        <NewsElement key={item.id} newsElement={item} />
                    </div>
                ))
            }
        </div>
    )
}
export default NewsList;