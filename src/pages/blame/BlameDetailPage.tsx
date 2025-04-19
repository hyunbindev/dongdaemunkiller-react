import { useEffect, useState } from "react"
import Blame from "../../components/blame/Blame"
import style from './blamePage.module.css';
import BlameComment from "../../components/blame/BlameComment";
import { useParams } from "react-router-dom";
import useBlameDetail from "../../hooks/useBlameDetail";
import { useInView } from "react-intersection-observer";
const BlameDetailPage = () => {
    const [ref, inView] = useInView();
    const { blameId } = useParams<{blameId:string}>();
    const { blame, comments, getBlame, getBlameComments , postNewBlameComment , getNextPage} = useBlameDetail(blameId || "");
    const [newComment, setNewComment] = useState<string>("");

    useEffect(()=>{
        getBlame();
        getBlameComments(0);
    },[]);
    useEffect(()=>{
        if (inView){
            getNextPage();
        }
    },[inView]);
    const handleCommentChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    }

    return(
        <div id={style.blameDetailPage}>
            {blame ? (<Blame blame={blame}/>):"저격글 가져오는중..."}
            <div className={style.blameComment}>
                <textarea placeholder="덧글을 입력해주세요." value={newComment} onChange={handleCommentChange}></textarea>
                <div id={style.submit} onClick={()=>{postNewBlameComment(newComment);setNewComment("")}}>등록</div>
            </div>
            {
                comments.map((comment, index) => {
                    return (
                        <BlameComment key={index} comment={comment}/>
                    );
                })
            }
            <div ref={ref} style={{height:"10px"}}></div>
        </div>
    )
}
export default BlameDetailPage;
