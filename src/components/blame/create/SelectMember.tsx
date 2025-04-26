import { use, useEffect } from 'react';
import { BlameCommentRequest, BlameRequest } from '../../../data/BlameInterface';
import useMemberSimple from '../../../hooks/useMemberSimple';
import BlameTargetMember from '../BlameTargetMember';
import style from './createBlame.module.css'
import no_search_icon from '../../../assets/no_search.svg';
import _ from 'lodash';
interface SelectMemberProps{
    setPhase:(phaseNumber:number)=>void;
    blameRequest:BlameRequest;
    submitHandler:(targetUuid?:string)=>void;
}

const SelectMember:React.FC<SelectMemberProps> =({setPhase,blameRequest,submitHandler}) =>{
    const {getAllMembers,getMemberByName,members,initMembers} = useMemberSimple();
    
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
                <div key={member.uuid} className={style.member}>
                    <BlameTargetMember member={member} submitHandler={submitHandler}/>
                </div>
            ))
        }
    </div>
    <div id={style.footer}>
        <button id={style.submit} onClick={()=>submitHandler()}>전체공개로 저격</button>
        <button onClick={()=>setPhase(0)}>이전</button>
    </div>
    </>)
}
export default SelectMember;