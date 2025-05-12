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
        setTotalCount(getTotalVoteCount(voteResult));
    },[voteResult])

    const getVoteResult=()=>{
        api.get('/api/v1/judgment/vote',{params:{judgmentId:judgmentId}})
        .then((res)=>{
            setVoteResult([...res.data.voteResult].sort((a, b) => a.selectionTitle.localeCompare(b.selectionTitle)));
            setVote(res.data.voted);
            setTotalCount(getTotalVoteCount(res.data.voteResult));
        })
        .catch((err)=>console.error(err));
    }

    const vote = (judgmentId:string,selectionId:string)=>{
        api.post('/api/v1/judgment/vote',{"judgmentId":judgmentId,"selectionId":selectionId})
        .then((res)=>{getVoteResult()})
        .catch((err)=>console.log(err));
    }

    const voteCancel = (judgmentId:string)=>{
        api.delete('/api/v1/judgment/vote',{params:{judgmentId:judgmentId}})
        .then(()=>getVoteResult())
        .catch((err)=>console.error(err));
    }
    function getTotalVoteCount(voteResult:JudgmentVoteCountResponse[]){
        let totalCount = 0;
        voteResult.map((result)=>{totalCount+=result.voteCount});
        return totalCount;
    }
    return{voteResult ,totalCount,voted ,vote,voteCancel};
}
export default useJudgmentVote;