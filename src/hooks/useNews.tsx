import { useEffect, useState } from "react";
import { NewsResponseInterface } from "../data/NewsInterface";
import api from "../shared/api";

const useNews = ()=>{
    const [newsRank,setNewsRank] = useState<NewsResponseInterface[]>([]);
    const [news, setNews] = useState<NewsResponseInterface[]>([]);
    const [page, setPage] = useState<number>(0);
    const [nextPage, setNextPage] = useState<boolean>(false);

    useEffect(() => {
        getRankNews();
        getNews(page);
    },[]);

    const getRankNews = ()=>{
        api.get(`/api/v1/news/rank`)
        .then(res=>{
            setNewsRank(res.data);
        })
        .catch(err=>
            console.error('Error fetching rank news:', err)
        );
    }

    const getNewsElement = async (id: string): Promise<NewsResponseInterface | null> => {
        try {
            console.log('Fetching news element with ID:', id);
            const res = await api.get(`/api/v1/news/${id}`);
            return res.data;
        } catch (err) {
            console.error('Error fetching news element:', err);
            return null;
        }
    }

    const getNews = (page:number)=>{
        api.get(`/api/v1/news`, {params:{page:page}})
        .then(res=>{
            setNews(res.data.content.news);
            setNextPage(res.data.nextPage);
            console.log('News fetched:', res.data.content.news);
        })
        .catch(err=>
            console.error('Error fetching news:', err)
        );
    }
    const getNextPage = () => {
        if (nextPage) {
            api.get(`/api/v1/news`, {params:{page:page+1}})
            .then(res => {
                setNews(prevNews => [...prevNews, ...res.data.content.news]);
                setNextPage(res.data.nextPage);
                setPage(page + 1);
            })
            .catch(err => console.error(err));
        }
    }
    
    return { news ,newsRank ,getNewsElement ,getNews ,getNextPage};
}
export default useNews;