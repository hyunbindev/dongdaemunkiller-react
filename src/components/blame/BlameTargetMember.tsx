import { useState } from "react";
import { MemberSimple } from "../../data/MemberInterface";
import style from './blameStyle.module.css'
interface BlameTargetMemberProps{
    member?:MemberSimple;
    submitHandler:(targetUuid?:string)=>void;
}

const BlameTargetMember:React.FC<BlameTargetMemberProps> = ({member, submitHandler})=>{
    return(
    <div className={style.targetMember} onClick={()=>submitHandler(member?.uuid)}>
        <img src={member?.profile}></img>
        <div className={style.name}>{member?.name}</div>
    </div>
    )
}
export default BlameTargetMember;