import Blame from './Blame';
import style from './blameSummaryStyle.module.css';
const BlameSummary = () => {
    return (
        <div id={style.blameSummary}>
            <div id={style.header}>
                <h1>동대문 저격</h1>
                <div id={style.more}>더보기</div>
            </div>
            <div>
                <Blame/>
                <Blame/>
                <Blame/>
                <Blame/>
                <Blame/>
            </div>
        </div>
    );
};
export default BlameSummary;