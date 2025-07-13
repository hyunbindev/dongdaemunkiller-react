import style from './NewsTopicThumbNail.module.css'
import sample_img from '../../../../assets/example.png'
const NewsTopicThumbNail = ()=>{
    return(
        <div className={style.topicThumb}>
            <img src={sample_img}/>
            <div className={style.content}>
                <h3>기사 title</h3>
                <p>컨텐ㅊ트컨텐ㅊ트컨텐ㅊ트컨텐ㅊ트컨텐ㅊ트컨텐ㅊ트컨텐ㅊ트컨텐ㅊ트컨텐ㅊ트컨텐ㅊ트컨텐ㅊ트</p>
            </div>
        </div>
    )
}
export default NewsTopicThumbNail;