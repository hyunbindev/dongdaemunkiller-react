import { BlameRequest } from '../../../data/BlameInterface';
import { UserState } from '../../../store/slice/userSlice';
import style from './createBlame.module.css'

interface EditBlameProps{
    user:UserState;
    onChangeHandler:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void;
    submitHandler:()=>void;
    setPhase:(phaseNumber:number)=>void;
    blameRequest:BlameRequest;
}

const EditBlame:React.FC<EditBlameProps> = ({user,onChangeHandler,submitHandler,setPhase ,blameRequest})=>{
    return(
        <>
        <h1>새 저격글 작성</h1>
        <div id={style.blameForm}>
            <div id={style.blameAuthor}>
                <img src={user.profile ? user.profile:undefined} id={style.profile}/>
                <div id={style.authorName}>{user.name}</div>
            </div>
            <div id={style.blameTextContainer}>
                <textarea onChange={e=>onChangeHandler(e)} value={blameRequest.content} id={style.text}placeholder='저격글을 작성하세요.'></textarea>
            </div>
        </div>
        <div id={style.footer}>
            <button id={style.submit} onClick={submitHandler}>게시</button>
            <button id={style.submit} onClick={()=>setPhase(0)}>이전</button>
        </div>
        </>
    )
}
export default EditBlame;