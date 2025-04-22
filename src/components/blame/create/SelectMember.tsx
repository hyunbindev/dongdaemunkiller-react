import { BlameCommentRequest, BlameRequest } from '../../../data/BlameInterface';
import BlameTargetMember from '../BlameTargetMember';
import style from './createBlame.module.css'

interface SelectMemberProps{
    setPhase:(phaseNumber:number)=>void;
    blameRequest:BlameRequest;
}

const SelectMember:React.FC<SelectMemberProps> =({setPhase,blameRequest}) =>{
    return(
    <>
    <h1>저격 대상 선택</h1>
    <p>저격대상으로 선택될 경우 대상은 작성한 저격글을 확인 할 수 없습니다.</p>
    <input id={style.searchMember} placeholder='검색할 대상 이름을 입력해주세요.'></input>
    <div id={style.memberList}>
        <BlameTargetMember/>
        <BlameTargetMember/>
        <BlameTargetMember/>
        <BlameTargetMember/>
        <BlameTargetMember/>
        <BlameTargetMember/>
        <BlameTargetMember/>
        <BlameTargetMember/>
        <BlameTargetMember/>
        <BlameTargetMember/>
        <BlameTargetMember/>
        <BlameTargetMember/>

    </div>
    <div id={style.footer}>
        <button id={style.submit} onClick={()=>setPhase(1)}>다음</button>
    </div>
    </>)
}
export default SelectMember;