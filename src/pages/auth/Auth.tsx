import React,{useEffect} from 'react';
import { useDispatch, } from 'react-redux';
import { loginUser, UserState } from '../../store/slice/userSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
const Auth = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 쿠키에서 redirectPath를 가져오는 함수
    // 오류 추정으로 인하여 deprecate
    function getCookie(name:string) {
      const cookies = document.cookie.split(';').map(c => c.trim());
      for (let cookie of cookies) {
        if (cookie.startsWith(`${name}=`)) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    }
    // sessionStrage 이용하여 브라우저 닫을 시 초기화 하는 방향
    function getRedirectPathFromSessionStorage(uri:string) {
      const path = sessionStorage.getItem('redirectPath');
      if (path) {
        sessionStorage.removeItem('redirectPath');
        return path;
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
          const savedPath = getRedirectPathFromSessionStorage('redirectPath');
          if (savedPath) {
            navigate(savedPath);
            return;
          }
            navigate('/');
          })
          .catch((error) => {
            console.error(error);
            alert('로그인에 실패했습니다. 다시 시도해주세요.');
            navigate('/');
          });
        return;
    },[])
    return(<>로그인 중...</>)
}
export default Auth;