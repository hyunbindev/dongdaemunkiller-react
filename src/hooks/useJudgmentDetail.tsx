import { useEffect, useState } from 'react';
import { JudgmentCommentResponse, JudgmentResponse } from '../data/JudgmentInterface';
import api from '../shared/api'
const useJudgmentDetail = (judgmentId:string|undefined)=>{
    const [judgment, setJudgment] = useState<JudgmentResponse>();
    const [comments, setComments] = useState<JudgmentCommentResponse[]>([]);
    
    const [page, setPage] = useState<number>(0);
    const [nextPage, setNextPage] = useState<boolean>(false);

    useEffect(()=>{
        api.get(`/api/v1/judgment/${judgmentId}`)
        .then((res)=>setJudgment(res.data))
        .catch((err)=>console.error(err))
        getJudgmentComments(page);
    },[]);

    const getJudgmentComments = (page:number) => {
        api.get(`/api/v1/judgmentComment/${judgmentId}`, {params:{page:page}})
        .then((response) => {
            setComments((prevComments) => [...prevComments, ...response.data.content.judgmentComments]);
            setNextPage(response.data.nextPage);

            setPage(page);
        })
        .catch((error) => {
            console.error('Error fetching judgment comments:', error);
        });
    }

    const submitJudgmentComment = (comment:string)=>{
        api.post(`/api/v1/judgmentComment/${judgmentId}`, {"text": comment})
        .then((res)=>{setComments([]);getJudgmentComments(0);})
        .catch((err)=>console.error(err));
    }
    
    const getNextPage = () => {
        if (nextPage){
            getJudgmentComments(page+1);
        }
    }

    return { judgment, submitJudgmentComment ,comments ,getJudgmentComments ,getNextPage };
}
export default useJudgmentDetail;