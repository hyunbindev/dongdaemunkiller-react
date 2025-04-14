import React,{useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
const Auth = () => {
    useEffect(()=>{
        const [searchParams] = useSearchParams();
        const accessToken = searchParams.get('accessToken');
        console.log(accessToken);
    },[])
    return(<></>)
}
export default Auth;