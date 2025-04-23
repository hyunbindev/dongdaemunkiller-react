import style from './picture.module.css';
import example from '../../assets/example.png'
import comment_icon from '../../assets/comment-white.svg'
import share_icon from '../../assets/share-white.svg'
import recommend_icon from '../../assets/recommend-white.svg'
const Picture = ()=>{
    return(
        <div className={style.picture}>
            <img className={style.img} src={example}>
            </img>
            <div className={style.controller}>
                <div>
                    <img className={style.icon} src={recommend_icon}/>
                </div>
                <div>
                    <img className={style.icon} src={comment_icon}/>
                </div>
                <div>
                    <img className={style.icon} src={share_icon}/>
                </div>
            </div>
            <div className={style.info}>
                <div className={style.img_info}>
                    <h1>만세 삼창</h1>
                    <div>2028.04.23</div>
                </div>
                <div className={style.author_info}>
                    <img src={example}></img>
                    <div className={style.name}>김현빈</div>
                </div>
            </div>
        </div>
    )
}
export default Picture;