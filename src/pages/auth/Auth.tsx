import React,{useEffect} from 'react';
import { useDispatch, } from 'react-redux';
import { loginUser, UserState } from '../../store/slice/userSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
const Auth = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function getCookie(name:string) {
      const cookies = document.cookie.split(';').map(c => c.trim());
      for (let cookie of cookies) {
        if (cookie.startsWith(`${name}=`)) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    } 
    useEffect(()=>{
        const accessToken = searchParams.get('accessToken');
        sessionStorage.setItem('accessToken', accessToken!);
        axios.get<UserState>('/api/v1/member', {
            headers: {
              Authorization: accessToken,
              'Content-Type': 'application/json',
            }
          })
          .then((response) => {
            dispatch(loginUser(response.data));
          const savedPath = getCookie('redirectPath');
          if (savedPath) {
            navigate(savedPath);
            return;
          }
            navigate('/');
          })
          .catch((error) => {
            console.error(error);
          });
        return;
    },[])
    return(<>로그인 중...</>)
}
export default Auth;