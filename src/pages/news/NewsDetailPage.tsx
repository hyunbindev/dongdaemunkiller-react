import { useNavigate, useParams } from 'react-router-dom';
import style from './NewsDetail.module.css'

import CommonComment from '../../components/common/comment/CommonComment';

import thumb_up_icon from '../../assets/thumb_up.svg';
import thumb_up_icon_blue from '../../assets/thumb_up_blue.svg';
import thumb_down_icon from '../../assets/thumb_down.svg';

import share_icon from '../../assets/share.svg'
import eyes_icon from '../../assets/eyes.svg'
import back_icon from '../../assets/back.svg'
import { NewsResponseInterface } from '../../data/NewsInterface';
import { useEffect, useState } from 'react';
import useNews from '../../hooks/useNews';
import useNewsRecommend from '../../hooks/useNewsRecommend';
import { getDateObject } from '../../utils/convertDate';
import useNewsComment from '../../hooks/useNewsComment';
import NewsComment from '../../components/news/NewsComment';
import { useInView } from 'react-intersection-observer';
import KaKaoShared from '../../shared/kakaoShared';

const NewsDetailPage = ()=>{
    const navigate = useNavigate();
    const [news, setNews] = useState<NewsResponseInterface | null>(null);
    const {getNewsElement} = useNews();
    const { newsId } = useParams();
    const {recommendStatus ,recommendNews, deleteRecommendNews}=useNewsRecommend(newsId);
    const {comments,postComment,getNextPageComments}  = useNewsComment(newsId || '');
    const [commentNodes, setCommentNodes] = useState<React.ReactNode[]>([]);
    const {newsShare}= KaKaoShared();
    const [ref, inView] = useInView();
    useEffect(() => {
        const fetchNews = async () => {
            if(newsId)setNews(await getNewsElement(newsId));
        };
        fetchNews();
    },[]);
    useEffect(()=>{
        setCommentNodes(comments.map((comment, index) => {
            return <NewsComment key={index} comment={comment}/>
        }));
    },[comments]);
    const date = getDateObject(news?.createdAt || '');
    useEffect(()=>{
        if (inView){
            getNextPageComments();
        }
    },[inView]);
    return news ? (
        <div id={style.newDetailPage}>
            <div id={style.header}>
                <h1>DongDaemun Times</h1>
                <h2>“what’s happening now in Dongdaemun.”</h2>
            </div>
            <div id={style.content}>
                <h1>{news.title}</h1>
                {
                    news.imageUrl &&(
                    <div id={style.imageContainer}>
                        <img src={news.imageUrl}/>
                    </div>)
                }
                <div id={style.text}>
                    {
                        news.text
                    }
                </div>
                <div id={style.info}>
                    <div id={style.author}>
                        <img id={style.profile} src={news.author.profile}/>
                        <div id={style.authorName}>{news.author.name}</div>
                    </div>
                    <div id={style.createdAt}>
                        {date.getFullYear()}年 {date.getMonth()+1}月 {date.getDate()}日
                    </div>
                </div>
            </div>
            <div id={style.controller}>
                {
                    recommendStatus?.type == "RECOMMEND" ?<div className={style.btnContainer} onClick={()=>deleteRecommendNews()} style={{"color":"#3A8DFF", "borderColor":"#3A8DFF"}}>
                        <img src={thumb_up_icon_blue} id={style.recommendIcon}/>
                        <div className={style.count}>{recommendStatus?.recommendCount}</div>
                    </div>:
                    <div className={style.btnContainer} onClick={()=>recommendNews("RECOMMEND")}>
                        <img src={thumb_up_icon}/>
                        <div className={style.count}>{recommendStatus?.recommendCount}</div>
                    </div>
                }
                
                {
                    /**비추천은 deprecated
                    <div className={style.btnContainer} onClick={()=>recommendNews("UN_RECOMMEND")}>
                        <img src={thumb_down_icon}/><div className={style.count}>{recommendStatus?.unRecommendCount}</div>
                    </div>
                        */
                }
                <div className={style.btnContainer}>
                    <img src={eyes_icon}/>
                    <div className={style.count}>{news.viewCount}</div>
                </div>

                <div className={style.btnContainer} onClick={()=>newsShare(news)}>
                    <img src={share_icon} style={{"margin":"0px"}}/>
                </div>
            </div>
            <div id={style.commentContainer}>
                <CommonComment onCommentSubmit={postComment} commentNodes={commentNodes}/>
                <div ref={ref} style={{height:"7rem"}}>
                </div>
            </div>
            <div id={style.back} onClick={()=>navigate('/news')}>
                <img src={back_icon}/>
            </div>
        </div>
    ) : (<div>Loading...</div>);
}
export default NewsDetailPage;