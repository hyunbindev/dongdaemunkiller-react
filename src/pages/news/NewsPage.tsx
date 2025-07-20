import NewsList from "../../components/news/list/NewsList";
import NewsTopicCarousel from "../../components/news/topic/carousel/NewsTopicCarousel";

import style from './NewsPage.module.css'
import useRestoreScroll from "../../hooks/useRestoreScroll";
import { useNavigate } from "react-router-dom";

import write_icon from '../../assets/write.svg'



const NewsPage = ()=>{
    const {saveScrollPoint} =useRestoreScroll();
    const navigate = useNavigate();
    return(
        <div id={style.newsPage}>
            <div id={style.header}>
                <h1>DongDaemun Times</h1>
                <h2>“what’s happening now in Dongdaemun.”</h2>
            </div>
            <div id={style.carousel}>
                <NewsTopicCarousel/>
            </div>
            <div id={style.list}>
                <h2 id={style.listTitle}>「東大門의 最新 늬우스」</h2>
                <div onClick={saveScrollPoint}>
                    <NewsList/>
                </div>
            </div>
            <div id={style.write} onClick={()=>{saveScrollPoint();navigate('/news/create')}}>
                <img src={write_icon}/>
            </div>
        </div>
    )
}
export default NewsPage;