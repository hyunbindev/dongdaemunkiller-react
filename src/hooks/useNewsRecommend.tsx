import { useEffect, useState } from "react";
import { NewsRecommendStatusInterface } from "../data/NewsInterface";
import api from "../shared/api";

const useNewsRecommend = (newsId:string|undefined) => {
    const [recommendStatus, setRecommendStatus] = useState<NewsRecommendStatusInterface|null>();
    
    useEffect(() => {
        if (!newsId) {
            console.error('News ID is undefined');
            return;
        }
        api.get(`/api/v1/news/${newsId}/recommend`)
        .then(res => {
            console.log('Recommend status fetched:', res.data);
            setRecommendStatus(res.data);
        })
        .catch(err => {
            console.error('Error fetching recommend status:', err);
        });
    },[]);

    const recommendNews=(type:string)=>{
        api.post(`/api/v1/news/${newsId}/recommend`,null,{params:{type:type}})
        .then((res)=>{
            setRecommendStatus(res.data);
        })
        .catch(err=>{
            console.error('Error recommending news:', err);
        });
    }
    
    const deleteRecommendNews=()=>{
        api.delete(`/api/v1/news/${newsId}/recommend`)
        .then((res)=>{
            setRecommendStatus(res.data);
        })
        .catch(err=>{
            console.error('Error deleting recommend news:', err);
        });
    }

    return { recommendStatus , recommendNews ,deleteRecommendNews};
}
export default useNewsRecommend;