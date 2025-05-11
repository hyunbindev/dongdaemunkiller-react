import { useEffect, useState } from "react";
import { JudgmentVoteCountResponse } from "../data/JudgmentInterface";
import api from '../shared/api';
interface useJudgmentVoteProps{
    judgmentId:string;
}
const useJudgmentVote = (judgmentId:string) => {
    const [voteResult,setVoteResult] = useState<JudgmentVoteCountResponse[]>([]);
    const [totalCount,setTotalCount] = useState<number>(0);
    const [voted, setVote] = useState<boolean>(false);
    useEffect(()=>{
        getVoteResult();
    },[])
    useEffect(()=>{
        let totalCount = 0;
        voteResult.map((result)=>{totalCount+=result.voteCount});
        setTotalCount(totalCount)
    },[voteResult])
    const getVoteResult=()=>{
        api.get('/api/v1/judgment/vote',{params:{judgmentId:judgmentId}})
        .then((res)=>{
            setVoteResult(res.data.voteResult);
            setVote(res.data.voted);
        })
        .catch((err)=>console.error(err));
    }
    const vote = (judgmentId:string,selectionId:string)=>{
        api.post('/api/v1/judgment/vote',{"judgmentId":judgmentId,"selectionId":selectionId})
        .then((res)=>{getVoteResult()})
        .catch((err)=>console.log(err));
    }
    return{voteResult ,totalCount,voted ,vote};
}
export default useJudgmentVote;