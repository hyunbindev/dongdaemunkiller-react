import style from'./blameStyle.module.css';
import comment from '../../assets/comment.svg'
import share from '../../assets/share.svg';
import { BlameResponse } from '../../data/BlameInterface';
import { convertDate } from '../../utils/convertDate';
const Blame:React.FC<{blame:BlameResponse}> = ({blame}) => {
    return (
        <div className={style.blame}>
            <div className={style.author}>
                <img src={blame.author.profile}></img>
                <div className={style.author_desc}>
                    <div className={style.name}>{blame.author.name}</div>
                    <div className={style.createdAt}>{convertDate(blame.createdAt)}</div>
                </div>
            </div>
            <div className={style.text}>
                {blame.text}
            </div>
            <div className={style.footer}>
                <div className={style.comment}>
                    <img src={comment} alt="comment" />
                    <div className={style.comment_count}>{blame.commentsCount}</div>
                </div>
                <div className={style.share}>
                    <img src={share} alt="share" />
                </div>
            </div>
        </div>
    );
};
export default Blame;