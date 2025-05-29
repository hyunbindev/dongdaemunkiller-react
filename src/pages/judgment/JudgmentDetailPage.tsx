import { useParams } from "react-router-dom";
import Judgment from "../../components/judgment/Judgment";
import useJudgmentDetail from "../../hooks/useJudgmentDetail";
import PostHeader from "../../components/common/header/PostHeader";
import style from './judgmentDetailPage.module.css'
import CommonComment from "../../components/common/comment/CommonComment";
import { useEffect, useState } from "react";
import JudgmentComment from "../../components/judgment/JudgmentComment";
import { useInView } from "react-intersection-observer";

const JudgmentDetailPage = ()=> {
    const { judgmentId } = useParams<{judgmentId:string}>();
    const { judgment, submitJudgmentComment ,comments ,getJudgmentComments ,getNextPage }=useJudgmentDetail(judgmentId);
    const [commentNodes, setCommentNodes] = useState<React.ReactNode[]>([]);
    const [ref, inView] = useInView();
    useEffect(()=>{
        setCommentNodes(comments.map((comment, index) => {
            return <JudgmentComment key={index} comment={comment}/>
        }));
    },[comments]);
    useEffect(()=>{
        if (inView){
            getNextPage();
        }
    },[inView]);
    return(
        <div className={style.judgmentDetailPage}>
            <PostHeader targetUrl={"/judgment"} title={"다른 재판글 보기"}/>
            {judgment ? <Judgment judgment={judgment} preview={false}/>:"재판 가져오는중..."}
            <CommonComment onCommentSubmit={submitJudgmentComment} commentNodes={commentNodes}/>
            <div ref={ref} style={{height:"10px"}}></div>
        </div>
    )
}
export default JudgmentDetailPage;