import useCreatejudgment from '../../../hooks/useCreateJudgment';
import style from './createJudgment.module.css'
import JudgmentSelection from './selection/JudgmentSelection';
import close from '../../../assets/close.svg'
import { Link } from 'react-router-dom';
const CreateJudgment = ()=>{
    const {selections, 
           selectionTitleHandler, 
           addSelection, 
           deleteSelection,
           title,
           setTitle,
           text,
           setText,
           submitJudgment}=useCreatejudgment();
    return(
        <div id={style.createJudgment}>
            <h1>동대문 재판 시작하기</h1>
            <div id={style.titleContainer}>
                <label>재판 제목</label>
                <input placeholder="재판 제목을 입력해 주세요." value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            </div>
            <div id={style.textContainer}>
                <label>재판 본문</label>
                <textarea placeholder='재판 본문을 입력해 주세요.' value={text} onChange={(e)=>setText(e.target.value)}>
                </textarea>
            </div>
            <div id={style.selectionContainer}>
                <label>판결 선택지</label>
                
                {
                    //selection list render
                    selections.map((selection,index)=>{return <JudgmentSelection selectionTitle={selection} index={index} selectionTitleHandler={selectionTitleHandler} deleteSelection={deleteSelection}/>})
                }
            </div>
            <div id={style.btnContainer}>
                <button id={style.addSelectionBtn} onClick={addSelection}>선택지 추가</button>
                <button id={style.submitJudgmentBtn}onClick={submitJudgment}>재판 시작</button>
            </div>
            <Link to={'/judgment'}>
                <img id={style.closeBtn} src={close}/>
            </Link>
        </div>
    )
}
export default CreateJudgment;