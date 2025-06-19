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
        const file = new File([voice], 'voice-file', { type: 'audio/webm' });
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