import { BlameCommentResponse } from '../../data/BlameInterface';
import { convertDate } from '../../utils/convertDate';
import style from './blameComment.module.css';
const BlameComment:React.FC<{comment:BlameCommentResponse}> = ({comment}) => {
    return (
        <div className={style.blameComment}>
            <div className={style.blameCommentHeader}>
                <div className={style.blameCommentAuthor}>
                    <img src={comment.author.profile}></img>
                    <div>{comment.author.name}</div>
                </div>
                <div className={style.createAt}>{convertDate(comment.createdAt)}</div>
            </div>
            <div className={style.commentText}>{comment.text}</div>
        </div>
    );
}
export default BlameComment;