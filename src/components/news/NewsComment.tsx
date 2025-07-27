
import { NewsCommentResponse } from '../../data/NewsInterface';
import { convertDate } from '../../utils/convertDate';
import style from './newsComment.module.css';

const NewsComment:React.FC<{comment:NewsCommentResponse}> = ({comment}) => {
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
export default NewsComment;