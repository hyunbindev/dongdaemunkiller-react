import style from'./blameStyle.module.css';
import comment from '../../assets/comment.svg'
import share from '../../assets/share.svg';
const Blame = () => {
    return (
        <div className={style.blame}>
            <div className={style.author}>
                <img src='http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'></img>
                <div className={style.author_desc}>
                    <div className={style.name}>작성자</div>
                    <div className={style.createdAt}>2023.10.01</div>
                </div>
            </div>
            <div className={style.text}>
                예준병신같음 ㅋㅋㅋㅋㅋ
            </div>
            <div className={style.footer}>
                <div className={style.comment}>
                    <img src={comment} alt="comment" />
                    <div className={style.comment_count}>0</div>
                </div>
                <div className={style.share}>
                    <img src={share} alt="share" />
                </div>
            </div>
        </div>
    );
};
export default Blame;