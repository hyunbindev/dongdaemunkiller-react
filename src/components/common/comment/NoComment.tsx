import noMsg from '../../../assets/chaterror.svg';
import style from './noComment.module.css'
const NoComment = () => {
    return(
    <div id={style.noCommentContainer}>
        <img id={style.icon} src={noMsg} alt="No comments available" />
        <div>아직 덧글이 없어요.<br/> 덧글을 입력해 볼까요?</div>
    </div>)
}
export default NoComment;