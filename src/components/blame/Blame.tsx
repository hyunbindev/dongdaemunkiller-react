import style from'./blameStyle.module.css';
import comment from '../../assets/comment.svg'
import share from '../../assets/share.svg';
import { BlameResponse } from '../../data/BlameInterface';
import { convertDate } from '../../utils/convertDate';
import KaKaoShared from '../../shared/kakaoShared';
const Blame:React.FC<{blame:BlameResponse}> = ({blame}) => {
    const {blameShare} = KaKaoShared();
    return (
        <div className={style.blame}>
            <div className={style.author}>
                <img className={style.profile} src={blame.author.profile}></img>
                <div className={style.author_desc}>
                    <div className={style.name}>{blame.author.name}</div>
                    <div className={style.createdAt}>{convertDate(blame.createdAt)}</div>
                </div>
            </div>
            {
                blame.target && 
                <div  className={style.target}>
                    <p>저격 피해자</p>
                    <div className={style.targetElementContainer}>
                        <div className={style.targetElement}>
                            <img className={style.profile} src={blame.target?.profile} alt="target profile" />
                            <div className={style.target_name}>{blame.target?.name}</div>
                        </div>
                    </div>
                </div>
            }
            <div className={style.text}>
                {blame.text}
            </div>
            <div className={style.footer}>
                <div className={style.comment}>
                    <img src={comment} alt="comment" />
                    <div className={style.comment_count}>{blame.commentsCount}</div>
                </div>
                <div className={style.share} onClick={() => blameShare(blame)}>
                    <img src={share} alt="share" />
                </div>
            </div>
        {blame.targeted && 
            <div className={style.blinder}>
                <div className={style.alert}>
                    <p>저격 당해 확인할 수 없는 글입니다.</p>
                </div>
            </div>}
        </div>
    );
};
export default Blame;