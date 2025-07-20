import { use, useEffect } from 'react';
import style from './personaPage.module.css';
import { useDispatch } from 'react-redux';
import { setDark, setLight } from '../../store/slice/themeSlice';
import persona_background from '../../assets/persona-background.jpg';
import Persona from '../../components/persona/Persona';
import CreatePersonaBtn from '../../components/persona/CreatePersonaBtn';
import usePersona from '../../hooks/usePersona';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import useRestoreScroll from '../../hooks/useRestoreScroll';
const PersonaPage = () => {
    const {saveScrollPoint} =useRestoreScroll();
    const dispatch = useDispatch();
    const [ref, inView] = useInView();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setDark()); // 테마를 다크로 전환
        return () => {
            dispatch(setLight()); // 페이지 벗어나면 라이트로 복귀
        };
    }, [dispatch]);
    const { personaList, initPersonaList, getNextPage} = usePersona();
    useEffect(() => {
        initPersonaList(); // 페르소나 목록 초기화
    }, []);
    
        useEffect(() => {
        if (inView) {
            getNextPage();
        }
    }, [,inView]);
    return (
        <div id={style.personaPage}>
            <div id={style.info}>
                <img id={style.background} src={persona_background} alt="페르소나 배경" className={style.background} />
                <div id={style.description}>
                    <h1 className={style.title}>동대문 페르소나</h1>
                    <h4>"당신의 진짜 이야기는, 가면 뒤에서 시작됩니다."</h4>
                    <p>당신은 이제 "페르소나"를 쓰고 이제까지 하지 못했던말 전부 말해보세요.</p>
                    <p>하지만 명심하세요. 누군가는 당신의 "페르소나"를 벗겨벼릴 수 있습니다.</p>
                </div>
            </div>
            <div id={style.content}>
                {
                    personaList.length > 0 ? (
                        personaList.map((persona) => (
                            <div onClick={()=>{saveScrollPoint();navigate(`/persona/${persona.personaId}`);}} key={persona.personaId} className={style.personaElement} style={{marginBottom:"1rem"}}>
                                <Persona key={persona.personaId} persona={persona} />
                            </div>
                        ))
                    ) : (
                        <div className={style.noPersona}>페르소나가 없습니다. 새로운 페르소나를 만들어보세요.</div>
                    )
                }
                <div ref={ref} style={{height:"20px"}}></div>
            </div>
            <CreatePersonaBtn/>
        </div>
    );
}
export default PersonaPage;