import React from 'react';
import loginStyle from './login.module.css';
const Login = () => {
    return (
        <div id={loginStyle.login}>
            <h1>동대문 Killer</h1>
            {/* <a href="http://218.39.156.143/oauth2/authorization/kakao">동대문 Killer 시작하기</a> */}
            <a id={loginStyle.start} href={`${import.meta.env.VITE_API_HOST}/api/oauth2/authorization/kakao`}>동대문 Killer 시작하기</a>
            <p>
                트라랄라레오 트랄라 퉁퉁퉁퉁퉁퉁 사후르 봄바르디로 크로코딜로 보네카 암발라부, 브르르 브르르 파타핌, 심판지니 바나니니, 봄봄비니 구시니, 카푸치노 아사시노, 트리피 트로피, 프리고 카멜로, 라 바카 사투르노 사투르니타
            </p>
        </div>
    );
}
export default Login;