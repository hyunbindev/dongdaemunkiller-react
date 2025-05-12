import style from './judgmentSelection.module.css';
import deleteIcon from '../../../../assets/remove_list.svg'

interface judgmentSelectionProps{
    selectionTitle:string;
    index:number;
    selectionTitleHandler:(title:string, index:number)=>void;
    deleteSelection:(index:number)=>void;
}

const JudgmentSelection:React.FC<judgmentSelectionProps> = ({selectionTitle,index,selectionTitleHandler, deleteSelection}) =>{
    return(
        <div className={style.judgmentSelection}>
            <input placeholder='판결 선택지 내용을 입력해 주세요.' value={selectionTitle} onChange={(e)=>selectionTitleHandler(e.target.value,index)}></input>
            <div className={style.deleteIcon} onClick={()=>{deleteSelection(index)}}>
                <img src={deleteIcon}/>
                <div className={style.text}>삭제</div>
            </div>
        </div>
    )
}
export default JudgmentSelection