import { Link } from 'react-router-dom';
import style from './trialSummaryStyle.module.css';
import useJudgment from '../../hooks/useJudgment';
import Judgment from './Judgment';
const JudgmentSummary = () => {
    const {judgmentList} = useJudgment();
    return (
        <div id={style.blameSummary}>
            <div id={style.header}>
                <h1>동대문 재판</h1>
                <Link to="/judgment" id={style.more}>더보기</Link>
            </div>
            <div>
                {
                    judgmentList.map((judgment, index)=>(
                        <Link to={`/judgment/${judgment.id}`}>
                            <Judgment judgment={judgment} preview={true}/>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};
export default JudgmentSummary;