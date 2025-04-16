import React,{useEffect} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
const Auth = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const accessToken = searchParams.get('accessToken');
        sessionStorage.setItem('accessToken', accessToken!);
        axios.get('/api/v1/member', {
            headers: {
              Authorization: accessToken,
              'Content-Type': 'application/json',
              // 다른 커스텀 헤더도 추가 가능
            }
          })
          .then((response: any) => {
            console.log(response.data);
            navigate('/');
          })
          .catch((error) => {
            console.error(error);
          });
        return;
    },[])
    return(<>ss</>)
}
export default Auth;