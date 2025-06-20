import { use, useEffect } from 'react';
import { BlameCommentRequest, BlameRequest } from '../../../data/BlameInterface';
import useMemberSimple from '../../../hooks/useMemberSimple';
import BlameTargetMember from '../../../components/blame/BlameTargetMember';
import style from './createBlame.module.css'
import targetStyle from '../blameStyle.module.css'
import no_search_icon from '../../../assets/no_search.svg';
import _ from 'lodash';
import { MemberSimple } from '../../../data/MemberInterface';
import { useSelector } from 'react-redux';
import { PersonaResponse } from '../../../data/PersonaInterface';
import useGuessPersona from '../../../hooks/useGuessPersona';

interface SelectGuessAuthorProps{
    persona : PersonaResponse;
    refreshPersonaFunc : ()=>void;
}

const SelectGuessAuthor:React.FC<SelectGuessAuthorProps> =({persona ,refreshPersonaFunc}) =>{
    const {getMemberByName,members,initMembers} = useMemberSimple();
    
    const {postGuess} = useGuessPersona(persona.personaId,refreshPersonaFunc);

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

    const submitHandler = (selecteMemberUuid:string) =>{
        //if(selecteMemberUuid === userUuid) return alert("자신은 선택 할 수 없습니다.");
        postGuess(selecteMemberUuid)
    }

    return(
    <div id={style.selectMemberContainer}>
    <input id={style.searchMember} placeholder='정체를 밝힐 대상 이름을 입력해주세요.' onChange={(e)=>handleSearchInput(e)}></input>
    <div id={style.memberList}>
        {
            members.length === 0 ? <div id={style.noMember}>
                <img src={no_search_icon} id={style.noSearchIcon}/>
                <p>정체를 밝힐 대상이 검색되지 않았습니다.<br/>대상을 검색해주세요</p>
            </div> :
            <div id={style.memberListContainer}>{
            members.map((member)=>(
                <div key={member.uuid} className={style.member} onClick={()=>submitHandler(member.uuid)}>
                    <BlameTargetMember member={member} submitHandler={()=>{}}/>
                </div>
            ))}
            </div>
        }
    </div>
    </div>)
}
export default SelectGuessAuthor;