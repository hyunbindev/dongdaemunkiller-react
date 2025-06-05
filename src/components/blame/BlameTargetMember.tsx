import { useState } from "react";
import { MemberSimple } from "../../data/MemberInterface";
import style from './blameStyle.module.css'
import { useSelector } from "react-redux";
interface BlameTargetMemberProps{
    member?:MemberSimple;
    submitHandler:(targetUuid?:string)=>void;
}

const BlameTargetMember:React.FC<BlameTargetMemberProps> = ({member, submitHandler})=>{
    
    const confirmTarget = () => {
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