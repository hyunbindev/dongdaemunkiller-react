import { BlameRequest } from '../../../data/BlameInterface';
import { UserState } from '../../../store/slice/userSlice';
import style from './createBlame.module.css'

interface EditBlameProps{
    user:UserState;
    onChangeHandler:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void;
    setPhase:(phaseNumber:number)=>void;
    blameRequest:BlameRequest;
}

const EditBlame:React.FC<EditBlameProps> = ({user,onChangeHandler,setPhase ,blameRequest})=>{

    const nextPhase = () =>{
        if(blameRequest.content.trim().length === 0){
            alert('저격글을 작성해주세요.');
            return;
        }
        setPhase(1);
    }
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
            <button onClick={nextPhase}>다음</button>
        </div>
        </>
    )
}
export default EditBlame;