import { use, useEffect } from 'react';
import { BlameCommentRequest, BlameRequest } from '../../../data/BlameInterface';
import useMemberSimple from '../../../hooks/useMemberSimple';
import BlameTargetMember from '../BlameTargetMember';
import style from './createBlame.module.css'

interface SelectMemberProps{
    setPhase:(phaseNumber:number)=>void;
    blameRequest:BlameRequest;
    submitHandler:(targetUuid?:string)=>void;
}

const SelectMember:React.FC<SelectMemberProps> =({setPhase,blameRequest,submitHandler}) =>{
    const {getAllMembers,getMemberByName,members} = useMemberSimple();
    useEffect(()=>{
        getAllMembers(0);
    },[]);

    return(
    <>
    <h1>저격 대상 선택</h1>
    <p>저격대상으로 선택될 경우 대상은 작성한 저격글을 확인 할 수 없습니다.</p>
    <input id={style.searchMember} placeholder='검색할 대상 이름을 입력해주세요.'></input>
    <div id={style.memberList}>
        {
            members.map((member)=>(
                <div key={member.uuid} className={style.member}>
                    <BlameTargetMember member={member} submitHandler={submitHandler}/>
                </div>
            ))
        }
    </div>
    <div id={style.footer}>
        <button id={style.submit} onClick={()=>submitHandler()}>전체공개로 저격</button>
        <button id={style.submit} onClick={()=>setPhase(0)}>이전</button>
    </div>
    </>)
}
export default SelectMember;