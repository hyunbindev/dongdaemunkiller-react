import style from './createPersonaBtn.module.css'
import icon from '../../assets/mic.svg';
import { useNavigate } from 'react-router-dom';
const CreatePersonaBtn = () => {
    const navigate = useNavigate();
    return (
        <button id={style.createPersonaBtn} onClick={() => {navigate('/persona/create')}}>
        <img src={icon}/>페르소나, 시작하기
        </button>
    );
}
export default CreatePersonaBtn;