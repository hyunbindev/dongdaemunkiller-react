import React from 'react';
import loginStyle from './login.module.css';
const Login = () => {
    return (
        <div id={loginStyle.login}>
            <h1>동대문 Killer</h1>
            {/* <a href="http://218.39.156.143/oauth2/authorization/kakao">동대문 Killer 시작하기</a> */}
            <a id={loginStyle.start} href={`${import.meta.env.VITE_API_HOST}/api/oauth2/authorization/kakao`}>동대문 Killer 시작하기</a>
            <p>
                나의 동대문 친구들을 위해...<br/>
                오직 동대문 친구들을 위한 웹 서비스입니다.<br/>
            </p>
        </div>
    );
}
export default Login;