import { useNavigate } from "react-router-dom";
import api from "../shared/api";

export interface NewsData {
    title: string;
    text: string;
}

export const useCreateNews = () => {
    const navigate = useNavigate();
    const submitNews = (news:NewsData, image:File|null)=>{
        if (!news.title || !news.text) {
            alert('제목과 내용을 입력해 주세요.');
            return;
        }
        
        const dtoBlob = new Blob([JSON.stringify({
            title: news.title,
            text: news.text,
        })], { type: 'application/json' });

        const formData = new FormData();
        
        formData.append('dto', dtoBlob);

        if (image) {
            formData.append('image', image);
        }

        api.post('/api/v1/news', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            navigate('/news');
        })
        .catch((err) => {
            console.error('Error creating news:', err);
        });
    }
    return { submitNews };
}