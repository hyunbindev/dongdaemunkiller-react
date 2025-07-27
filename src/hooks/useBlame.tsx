import { useEffect, useState } from "react";
import { BlameResponse } from "../data/BlameInterface";
import api from "../shared/api";
import { logoutUser } from '../store/slice/userSlice';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const useBlame = (navigate:NavigateFunction) =>{
    const [blameList, setBlameList] = useState<BlameResponse[]>([]);
    const [page, setPage] = useState<number>(0);
    const [nextPage, setNextPage] = useState<boolean>(false);
    
    const dispatch = useDispatch();
    const initBlamelist = ()=>{
        api.get('/api/v1/blame',{params:{page:0}})
        .then((res)=>{
            setBlameList(res.data.content.blames);
            setNextPage(false);
            setPage(0);
            setNextPage(res.data.nextPage);
        })
        .catch((error)=>{
            if(error.response.status==401){
                console.error("로그인 만료");
                alert("재 로그인이 필요합니다.");
                dispatch(logoutUser());
                sessionStorage.removeItem('accessToken');
                navigate('/');
            }
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

    return { blameList ,initBlamelist , getNextPage ,nextPage};
}
export default useBlame;