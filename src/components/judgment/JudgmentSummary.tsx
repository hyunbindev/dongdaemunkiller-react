import { Link } from 'react-router-dom';
import Blame from '../blame/Blame';
import style from './trialSummaryStyle.module.css';
const JudgmentSummary = () => {
    return (
        <div id={style.blameSummary}>
            <div id={style.header}>
                <h1>동대문 재판</h1>
                <Link to="/judgment" id={style.more}>더보기</Link>
            </div>
            <div>
                
            </div>
        </div>
    );
};
export default JudgmentSummary;