import { useState } from "react";
import NewsList from "../../components/news/list/NewsList";
import NewsTopicCarousel from "../../components/news/topic/carousel/NewsTopicCarousel";

import style from './NewsPage.module.css'

const NewsPage = ()=>{
    const [test,setTest] = useState<number>(1);
    const testfunc =()=>{
        setTest(test+1);
    }
    return(
        <div id={style.newsPage}>
            <div id={style.header}>
                <h1 onClick={testfunc}>DongDaemun Times</h1>
                <h2>“what’s happening now in Dongdaemun.”</h2>
                {test}
            </div>
            <div id={style.carousel}>
                <NewsTopicCarousel/>
            </div>
            <div id={style.list}>
                <h2 id={style.listTitle}>「東大門의 最新 늬우스」</h2>
                <NewsList/>
            </div>
        </div>
    )
}
export default NewsPage;