import { useEffect } from "react"

const RedirectionAuth = () => {
    useEffect(()=>{
        // 카카오인에 브라우저에서 이상함 쿠키는 제거
        //document.cookie = `redirectPath=${path}; path=/;`;
        
        const params = new URLSearchParams(window.location.search);
        const redirectPath = params.get('redirectPath') || '/';
        console.log("Redirecting to:", redirectPath);
        sessionStorage.setItem('redirectPath', redirectPath);
        window.location.href = `/dongdaemunkiller/api/oauth2/authorization/kakao`;
    },[])
    return<>리다이렉션중...</>
}
export default RedirectionAuth;