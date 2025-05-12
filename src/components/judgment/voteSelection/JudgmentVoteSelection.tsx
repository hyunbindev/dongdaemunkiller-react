import { useEffect } from 'react';
import useJudgmentVote from '../../../hooks/useJudgmentVote';
import style from './judgmentVoteSelection.module.css'
import SelectionBar from './SelectionBar';

interface JudgmentVoteSelection{
    judgmentId:string;
    setTotalVoteCount:(totalCount:number)=>void|undefined;
}
const JudgmentVoteSelection = ({judgmentId,setTotalVoteCount}:JudgmentVoteSelection) =>{
    const {voteResult,totalCount, voted, vote, voteCancel}=useJudgmentVote(judgmentId);
    useEffect(()=>{
        if(totalCount !== 0)setTotalVoteCount(totalCount);
    },[totalCount])
    return(
        <div className={style.judgmentVoteSelection}>
            {
                voted ? voteResult.map((result,index)=>(<SelectionBar key={index} judgmentId={judgmentId} title={result.selectionTitle} voteCount={result.voteCount} totalVoteCount={totalCount}/>))
                :<div className={style.selectionContainer}>
                    {
                        voteResult.map((selection,index)=>(<div key={index} onClick={()=>vote(judgmentId,selection.selectionId)} className={style.selection}>{selection.selectionTitle}</div>))
                    }
                </div>
            }    
            <div id={style.voteCancelContainer}>
                <div id={style.voteCancelBtn} onClick={()=>voteCancel(judgmentId)}>투표취소</div>
            </div>
        </div>
    )
}
export default JudgmentVoteSelection;