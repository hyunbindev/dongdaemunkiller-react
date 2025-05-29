import { useEffect, useState } from "react"
import Blame from "../../components/blame/Blame"
import style from './blamePage.module.css';
import BlameComment from "../../components/blame/BlameComment";
import { useParams } from "react-router-dom";
import useBlameDetail from "../../hooks/useBlameDetail";
import { useInView } from "react-intersection-observer";
import PostHeader from "../../components/common/header/PostHeader";
import CommonComment from "../../components/common/comment/CommonComment";
const BlameDetailPage = () => {
    const [ref, inView] = useInView();
    const { blameId } = useParams<{blameId:string}>();
    const { blame, comments, getBlame, getBlameComments , postNewBlameComment , getNextPage} = useBlameDetail(blameId || "");
    const [commentNodes, setCommentNodes] = useState<React.ReactNode[]>([]);

    useEffect(()=>{
        getBlame();
        getBlameComments(0);
    },[]);
    
    useEffect(()=>{
        if (inView){
            getNextPage();
        }
    },[inView]);

    useEffect(()=>{
        setCommentNodes(comments.map((comment, index) => {
            return <BlameComment key={index} comment={comment}/>
        }));
    },[comments]);

    return(
        <>
            <PostHeader targetUrl={"/blame"} title={"다른 저격글 보기"}/>
        <div id={style.blameDetailPage}>
            {blame ? (<Blame blame={blame}/>):"저격글 가져오는중..."}
            <CommonComment onCommentSubmit={postNewBlameComment} commentNodes={commentNodes}/>
            <div ref={ref} style={{height:"10px"}}></div>
        </div>
        </>
    )
}
export default BlameDetailPage;
