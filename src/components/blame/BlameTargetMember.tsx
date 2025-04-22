import { useState } from "react";
import { MemberSimple } from "../../data/MemberInterface";
import style from './blameStyle.module.css'
interface BlameTargetMemberProps{
    member?:MemberSimple;
}

const BlameTargetMember:React.FC<BlameTargetMemberProps> = ({member})=>{
    return(
    <div className={style.targetMember}>
        <img src={member?.profile}></img>
        <div className={style.name}>{member?.name}</div>
    </div>
    )
}
export default BlameTargetMember;