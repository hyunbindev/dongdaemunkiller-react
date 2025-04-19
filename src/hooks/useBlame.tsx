import { useEffect, useState } from "react";
import { BlameResponse } from "../data/BlameInterface";
import api from "../shared/api";

const useBlame = () =>{
    const [blameList, setBlameList] = useState<BlameResponse[]>([]);
    const [page, setPage] = useState<number>(0);
    const [nextPage, setNextPage] = useState<boolean>(false);
    
    const initBlamelist = ()=>{
        api.get('/api/v1/blame',{params:{page:0}})
        .then((res)=>{
            setBlameList(res.data.content.blames);
            setNextPage(res.data.nextPage);
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    const getNextPage = () => {
        if(nextPage){
            api.get('/api/v1/blame',{params:{page:page+1}})
            .then((res)=>{
                setBlameList((prevBlameList) => [...prevBlameList, ...res.data.content.blames]);
                setNextPage(res.data.nextPage);
                setPage(page+1);
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }

    useEffect(()=>{
        initBlamelist();
    },[]);

    return { blameList ,initBlamelist , getNextPage};
}
export default useBlame;