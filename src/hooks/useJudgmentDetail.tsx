import { useEffect, useState } from 'react';
import { JudgmentResponse } from '../data/JudgmentInterface';
import api from '../shared/api'
const useJudgmentDetail = (judgmentId:string|undefined)=>{
    const [judgment, setJudgment] = useState<JudgmentResponse>();
    useEffect(()=>{
        api.get(`/api/v1/judgment/${judgmentId}`)
        .then((res)=>setJudgment(res.data))
        .catch((err)=>console.error(err))
    },[])
    return {judgment};
}
export default useJudgmentDetail;