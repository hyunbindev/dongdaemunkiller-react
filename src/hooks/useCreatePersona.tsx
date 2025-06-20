import api from '../shared/api';
import { useNavigate } from "react-router-dom";
const useCreatePersona = () =>{
    const navigate = useNavigate();
    const submitPersona = (voice:Blob|null)=>{
        console.log('Submitting persona with voice:', voice);
        if(!voice){
            alert('바둑봇이 목소리를 변환하지 못했습니다. 다시 시도해 주세요.');
            return;
        }
        //MIMIE 타입을 확인하고 파일로 변환
        //; 뒤에 세부 내용 있을 시 사파리에서는 재생이 불가함 EX) audio/webm;codecs=opus
        let mimeType = voice.type;
        if (mimeType.includes(';')){
            mimeType = mimeType.split(';')[0];
        }
        const file = new File([voice], 'voice-file', { type: mimeType });

        const formData = new FormData();
        
        formData.append('voice-file', file);
        
        api.post('/api/v1/persona', formData,{headers: {
            'Content-Type': 'multipart/form-data',}})
            .then((res) => {
                console.log('Persona created successfully:', res.data);
                navigate('/persona');
            })
            .catch((err) => {
                console.error('Error creating persona:', err);
            });
    }
    return { submitPersona };
}
export default useCreatePersona;