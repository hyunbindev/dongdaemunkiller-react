import { MemberSimple } from "../../data/MemberInterface";
import style from './blameStyle.module.css'
interface BlameTargetMemberProps{
    member?:MemberSimple;
}

const BlameTargetMember:React.FC<BlameTargetMemberProps> = ({member})=>{
    return(
    <div className={style.targetMember}>
        <img></img>
        <div className={style.name}>사용자</div>
    </div>
    )
}
export default BlameTargetMember;