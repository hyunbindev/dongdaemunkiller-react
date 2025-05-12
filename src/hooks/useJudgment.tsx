import { useEffect, useState } from "react";
import api from '../shared/api'
import { JudgmentResponse } from "../data/JudgmentInterface";
const useJudgment = () =>{
    const [judgmentList, setJudgmentList] = useState<JudgmentResponse[]>([]);
    const [page, setPage] = useState<number>(0);
    const [nextPage, setNextPage] = useState<boolean>(false);

    const initJudgmentlist = () =>{
        api.get('/api/v1/judgment',{params:{page:0}})
        .then((res)=>{
            setJudgmentList(res.data.content.judgments);
            setNextPage(res.data.nextPage);
            setPage(0);
        })
        .catch((err)=>{
            console.error(err);
        })
    }
    
    const getNextPage = () =>{
        if(nextPage){
            api.get('/api/v1/judgment',{params:{page:page+1}})
            .then((res)=>{
                setJudgmentList((prevJudgmentList)=> [...prevJudgmentList, ...res.data.content.judgments])
                setNextPage(res.data.nextPage);
                setPage(page+1);
            })
            .catch((err)=>console.error(err));
        }
    }

    useEffect(()=>{
        initJudgmentlist();
    },[]);

    return { judgmentList, initJudgmentlist, getNextPage }
}
export default useJudgment;