import { use, useEffect } from 'react';
import { BlameCommentRequest, BlameRequest } from '../../../data/BlameInterface';
import useMemberSimple from '../../../hooks/useMemberSimple';
import BlameTargetMember from '../BlameTargetMember';
import style from './createBlame.module.css'
import targetStyle from '../blameStyle.module.css'
import no_search_icon from '../../../assets/no_search.svg';
import _ from 'lodash';
import { MemberSimple } from '../../../data/MemberInterface';
import { useSelector } from 'react-redux';
interface SelectMemberProps{
    setPhase:(phaseNumber:number)=>void;
    blameRequest:BlameRequest;
    submitHandler:(targetUuid?:string)=>void;
    selectedMember:MemberSimple[];
    setSelectedMember: React.Dispatch<React.SetStateAction<MemberSimple[]>>;
}

const SelectMember:React.FC<SelectMemberProps> =({setPhase,blameRequest,submitHandler,selectedMember,setSelectedMember}) =>{
    const {getAllMembers,getMemberByName,members,initMembers} = useMemberSimple();
    const userUuid = useSelector((state: any) => state.user.uuid);
    const debouncedGetMemberByName = _.debounce((name:string)=>{
        if(name.trim().length > 0){
            getMemberByName(name,0);
        }else{
            initMembers();
        }
    }, 300);

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        debouncedGetMemberByName(name);
    };

    const handleAddTarget = (target:MemberSimple):void => {
        /**if(target.uuid === userUuid){
            alert('자신을 저격할 수 없습니다.');
            return;
        }**/
       /**
        if(selectedMember.some((m) => m.uuid === target.uuid)){
            alert('이미 선택된 대상입니다.');
            return;
        }
        */
        setSelectedMember(prev => [...prev, target]);
        return
    }
    const handleDeleteTarget = (target:string):void => {
        setSelectedMember(prev => prev.filter(member => member.uuid !== target));
    }

    return(
    <>
    <h1>저격 대상 선택</h1>
    <p>저격대상으로 선택될 경우 대상은 작성한 저격글을 확인 할 수 없습니다.</p>
    <input id={style.searchMember} placeholder='검색할 대상 이름을 입력해주세요.' onChange={(e)=>handleSearchInput(e)}></input>
    <div id={style.memberList}>
        {
            members.length === 0 ? <div id={style.noMember}>
                <img src={no_search_icon} id={style.noSearchIcon}/>
                <p>검색된 저격대상이 없습니다.<br/>대상을 검색해주세요<br/>대상은 작성한 저격글을 확인 할 수 없습니다.</p>
            </div> :
            members.map((member)=>(
                <div key={member.uuid} className={style.member} onClick={()=>{handleAddTarget(member)}}>
                    <BlameTargetMember member={member} submitHandler={()=>{}}/>
                </div>
            ))
        }
    </div>
    <div>
        { selectedMember.length > 0 &&
        <div id={style.selectedMember}>
            <div>선택된 저격 대상</div>
            <div id={style.selectedMemberList}>
                {
                    selectedMember.map((member, index) => (
                        <div className={targetStyle.targetMember} onClick={()=>handleDeleteTarget(member.uuid)} key={index}>
                            <img src={member?.profile}></img>
                            <div className={style.name}>{member?.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
        }
    </div>
    <div id={style.footer}>
        <button id={style.submit} onClick={()=>submitHandler()}>저격하기</button>

        <button onClick={()=>setPhase(0)}>이전</button>
    </div>
    </>)
}
export default SelectMember;