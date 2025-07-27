import NewsList from "../../components/news/list/NewsList";
import NewsTopicCarousel from "../../components/news/topic/carousel/NewsTopicCarousel";

import style from './NewsPage.module.css'
import useRestoreScroll from "../../hooks/useRestoreScroll";
import { useNavigate } from "react-router-dom";

import write_icon from '../../assets/write.svg'
import useNews from "../../hooks/useNews";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";



const NewsPage = ()=>{
    const {saveScrollPoint} =useRestoreScroll();
    const navigate = useNavigate();
    const {newsRank, news, getNextPage}= useNews();
    const [ref, inView] = useInView();
      useEffect(()=>{
        if(inView){
          getNextPage();
        }
      },[])
      useEffect(() => {
          if (inView) {
              getNextPage();
          }
      }, [inView]);
    return(
        <div id={style.newsPage}>
            <div id={style.header}>
                <h1>DongDaemun Times</h1>
                <h2>“what’s happening now in Dongdaemun.”</h2>
            </div>
            <div id={style.carousel}>
                <NewsTopicCarousel newsRank={newsRank}/>
            </div>
            <div id={style.list}>
                <h2 id={style.listTitle}>「東大門의 最新 늬우스」</h2>
                <div onClick={saveScrollPoint} style={{paddingBottom: '5rem'}}>
                    <NewsList news={news}/>
                    <div ref={ref} style={{height:"10px"}}></div>
                </div>
            </div>
            <div id={style.write} onClick={()=>{saveScrollPoint();navigate('/news/create')}}>
                <img src={write_icon}/>
            </div>
        </div>
    )
}
export default NewsPage;