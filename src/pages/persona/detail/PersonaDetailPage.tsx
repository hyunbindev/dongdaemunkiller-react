import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDark, setLight } from "../../../store/slice/themeSlice";
import style from './personaDetailPage.module.css'
import Persona from "../../../components/persona/Persona";
import usePersonaDetail from "../../../hooks/userPersonaDetail";
import { useNavigate, useParams } from "react-router-dom";
import back_icon from '../../../assets/back.svg';
import guess_icon from '../../../assets/dark/eyes_dark.svg'
import kaKaoShared_icon from "../../../assets/share-white.svg";
import KaKaoShared from "../../../shared/kakaoShared";
import PersonaGuessComponent from "./PersonaGuessComponent";
const PersonaDetailPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDark());
        return () => {
            dispatch(setLight());
        };
    }, [dispatch]);
    const { personaId } = useParams<{personaId:string}>();
    const { persona ,getPersona } = usePersonaDetail(personaId || "");

    useEffect(()=>{
        getPersona();
    },[])
    
    useEffect(()=>{
        console.log(persona)
    },[persona])
    const {personaShare} = KaKaoShared();
    return (
        <div id={style.personaDetailPageContainer}>
            <div id={style.header}><img src={back_icon} onClick={()=>navigate('/persona')}/> 다른 페르소나 보기</div>
            {persona ? (<Persona persona={persona}/>) : "페르소나 가져오는 중..."}
            <div id={style.footer}>
                <div className={style.footerElement}>
                    <img src={guess_icon}/>
                    <div className={style.text}>0</div>
                </div>
                {persona &&
                <div className={style.footerElement} onClick={()=>personaShare(persona)}>
                    <img src={kaKaoShared_icon}/>
                </div>}
            </div>
            {
                persona && <PersonaGuessComponent refreshPersonaFunc={getPersona} persona={persona}/>
            }
        </div>
    );
}
export default PersonaDetailPage;