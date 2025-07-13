import { useNavigate } from 'react-router-dom';
import style from './NewsDetail.module.css'

const NewsDetailPage = ()=>{
    const navigate = useNavigate();
    return(
        <div  onClick={()=>navigate('/news')}>
            newDeati
        </div>
    )
}
export default NewsDetailPage;