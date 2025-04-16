import React,{useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';

const Auth = () => {
    const [searchParams] = useSearchParams();
    useEffect(()=>{
        const accessToken = searchParams.get('accessToken');
        console.log(accessToken);
    },[])
    return(<>ss</>)
}
export default Auth;