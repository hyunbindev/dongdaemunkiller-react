import { useEffect } from "react"

const RedirectionAuth = () => {
    useEffect(()=>{
        const path = window.location.pathname;
        // 카카오인에 브라우저에서 이상함 쿠키는 제거
        //document.cookie = `redirectPath=${path}; path=/;`;
        sessionStorage.setItem('redirectPath', path);
        window.location.href = `/api/oauth2/authorization/kakao`;
    },[])
    return<>리다이렉션중...</>
}
export default RedirectionAuth;