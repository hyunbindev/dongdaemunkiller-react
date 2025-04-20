import React,{useEffect} from 'react';
import { useDispatch, } from 'react-redux';
import { loginUser, UserState } from '../../store/slice/userSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
const Auth = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
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