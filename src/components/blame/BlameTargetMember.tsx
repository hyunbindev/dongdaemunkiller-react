import { useState } from "react";
import { MemberSimple } from "../../data/MemberInterface";
import style from './blameStyle.module.css'
interface BlameTargetMemberProps{
    member?:MemberSimple;
    submitHandler:(targetUuid?:string)=>void;
}

const BlameTargetMember:React.FC<BlameTargetMemberProps> = ({member, submitHandler})=>{

    const confirmTarget = () => {
        if(confirm(`${member?.name}님을 저격하시겠습니까?`)){
            submitHandler(member?.uuid);
        }
        return;
    }

    return(
    <div className={style.targetMember} onClick={confirmTarget}>
        <img src={member?.profile}></img>
        <div className={style.name}>{member?.name}</div>
    </div>
    )
}
export default BlameTargetMember;