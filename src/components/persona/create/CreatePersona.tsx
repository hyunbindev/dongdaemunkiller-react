import { useDispatch } from 'react-redux';
import style from './createPersona.module.css'
import { useEffect, useState } from 'react';
import { setDark, setLight } from '../../../store/slice/themeSlice';
import back_icon from '../../../assets/back.svg';
import record_icon from '../../../assets/mic_dark.svg';
import record_icon_recording from '../../../assets/mic_dark_recording.svg';
import { useRecordPersona } from '../../../hooks/userRecordPersona';
import voice_icon from '../../../assets/voice_icon.svg';
import { useNavigate } from 'react-router-dom';
import useCreatePersona from '../../../hooks/useCreatePersona';
const CreatePersona = ()=>{
    const [selectedKey, setSelectedKey] = useState<number | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDark()); // 테마를 다크로 전환
        return () => {
            dispatch(setLight()); // 페이지 벗어나면 라이트로 복귀
        };
    }, [dispatch]);

    const {
    isRecording,
    audioURL,
    startRecording,
    stopRecording,
    playWithRobotEffect,
    playWithHighPitchEffect,
    playWithCyberpunkEffect,
    playWithRadioEffect,
    processedBlobRef,
    isProcessed,
    } = useRecordPersona();
    
    const {submitPersona} = useCreatePersona();
    const recordBtnStyle =(isRecording:boolean) =>{
        if(isRecording) return style.recording;
        return style.waiting;
    }

    return(
    <div id={style.createPersonaContainer}>
        <div id={style.header}>
            <img src={back_icon} onClick={()=>navigate('/persona')}/> 페르소나 시작하기
        </div>
        <div id={style.content}>
            <button id={style.recordBtn} className={recordBtnStyle(isRecording)} onClick={()=>{(isRecording ? stopRecording : startRecording)(); setSelectedKey(null);}}>
                <img src={isRecording ? record_icon_recording : record_icon}/>
            </button>
            <p>{isRecording ? `바둑봇이 당신의 목소리를 듣는 중...`: `버튼을 눌러 녹음을 시작하세요.`}</p>
                  
            {audioURL && (
                <div id={style.voiceEffectContainer}>
                    <button onClick={()=>{playWithRobotEffect();setSelectedKey(1);}} key={1} className={selectedKey == 1 ? style.selected : ''}>
                        <img src={voice_icon}/>
                    </button>
                    <button onClick={()=>{playWithHighPitchEffect();setSelectedKey(2);}} key={2} className={selectedKey == 2 ? style.selected : ''}><img src={voice_icon}/></button>
                    <button onClick={()=>{playWithCyberpunkEffect();setSelectedKey(3);}} key={3}className={selectedKey == 3 ? style.selected : ''}><img src={voice_icon}/></button>
                    <button onClick={()=>{playWithRadioEffect();setSelectedKey(4);}} key={4}className={selectedKey == 4 ? style.selected : ''}><img src={voice_icon}/></button>
                </div>                
            )}
            { !isProcessed && audioURL && (<div>위버튼을 눌러 바둑봇이 목소리를 변환해 주세요.</div>)}
            { isProcessed && audioURL && (<div id={style.submit} onClick={()=>submitPersona(processedBlobRef.current)}>페르소나 만들기</div>)}
        </div>
    </div>)
}
export default CreatePersona;