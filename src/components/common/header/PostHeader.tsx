
import { useNavigate } from 'react-router-dom';
import back_icon from '../../../assets/back.svg'
import style from './postHeader.module.css'
interface PostHeaderProps {
    targetUrl: string;
    title: string;
}
const PostHeader:React.FC<PostHeaderProps> = ({targetUrl,title}) =>{
    const navigate = useNavigate();
    return(
        <div id={style.postHeader}>
            <div id={style.back} onClick={()=>{navigate(`${targetUrl}`)}}>
                <img src={back_icon} alt="뒤로가기"/>
                {title}
            </div>
        </div>
    )
}
export default PostHeader;