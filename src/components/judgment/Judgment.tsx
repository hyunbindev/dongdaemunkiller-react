import style from './JudgmentStyle.module.css'
import comment from '../../assets/comment.svg'
import share from '../../assets/share.svg'
import vote from '../../assets/vote.svg'
import { convertDate } from '../../utils/convertDate';
import { JudgmentResponse } from '../../data/JudgmentInterface';
import JudgmentVoteSelection from './voteSelection/JudgmentVoteSelection';
import { useEffect, useState } from 'react';
interface judgmentProps{
    judgment : JudgmentResponse;
    preview : boolean;
    voteCount : number|undefined;
}
const Judgment:React.FC<judgmentProps> = ({judgment,preview,voteCount}) => {
    const [totalVoteCount,setTotalVoteCount] = useState<number|undefined>(0);
    useEffect(()=>{
        if(voteCount){
            setTotalVoteCount(voteCount)
        }else{
            setTotalVoteCount(judgment.voteCount);
        }
    },[voteCount])
  return (
    <div className={style.judgment}>
            <div className={style.author}>
                <img src={judgment.author.profile}></img>
                <div className={style.author_desc}>
                    <div className={style.name}>{judgment.author.name}</div>
                    <div className={style.createdAt}>{convertDate(judgment.createdAt)}</div>
                </div>
            </div>
        <h1 className={style.title}>{judgment.title}</h1>
        <p className={style.text}>{judgment.text}</p>
        {
            /** 선택지 - 미리보기 일경우 표시하지 않음 */
            !preview&&<JudgmentVoteSelection judgmentId={judgment.id} setTotalVoteCount={setTotalVoteCount}/>
        }
        <div className={style.footer}>
            <div className={style.comment}>
                <img src={comment} alt="comment" />
                {/** 덧글 수*/}
                <div className={style.count}>0</div>
                <img src={vote} alt="vote" />
                <div className={style.count}>{totalVoteCount}</div>
            </div>
            <div className={style.share}>
                <img src={share} alt="share" />
            </div>
        </div>
    </div>
  );
}
export default Judgment