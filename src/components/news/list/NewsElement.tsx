import style from './NewsElement.module.css'
import sample_img from'../../../assets/example-2.png'
import { useNavigate } from 'react-router-dom';
const NewsElement = ()=> {
    const navigate = useNavigate();
    return(
        <div className={style.NewsElement} onClick={()=>navigate('/news/59')}>
            <img src={sample_img} className={style.thumb}/>
            <div className={style.text}>
                <h2 className={style.title}>기사글 타이틀</h2>
                <div className={style.info}>
                    <div>작성자</div>
                    <div>5시간전</div>
                </div>
            </div>
        </div>
    );
}
export default NewsElement;