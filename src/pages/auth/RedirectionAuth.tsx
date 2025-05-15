import { useEffect } from "react"

const RedirectionAuth = () => {
    useEffect(()=>{
        const path = window.location.pathname;
        document.cookie = `redirectPath=${path}; path=/;`;
        window.location.href = `/api/oauth2/authorization/kakao`;
    },[])
    return<></>
}
export default RedirectionAuth