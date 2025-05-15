import style from './sheriffSummaryStyle.module.css'
import left_arrow from '../../assets/left_arrow.svg'
const SherrifSummary = () => {
    return (
        <div id={style.sheriffSummary}>
            <h1>동대문 보안관</h1>
            <div id={style.sheriffContent}>
                <h2>현재 동대문보안관 투표가 진행중</h2>
                <div>투표 종료까지</div>
                <div id={style.count}>00:00:00</div>
                <div id={style.sheriffVote}>
                    투표하러 가기
                    <img src={left_arrow} alt="long-arrow-right" onClick={()=> alert('기능 구현 중')}/>
                </div>
            </div>
        </div>
    );
};
export default SherrifSummary;