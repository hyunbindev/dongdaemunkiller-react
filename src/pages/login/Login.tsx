import React from 'react';
import loginStyle from './login.module.css';
const Login = () => {
    return (
        <div id={loginStyle.login}>
            <h1>동대문 Friends</h1>
            {/* <a href="http://218.39.156.143/oauth2/authorization/kakao">동대문 Killer 시작하기</a> */}
            <a id={loginStyle.start} href={`${import.meta.env.VITE_API_HOST}/api/oauth2/authorization/kakao`}>동대문 Killer 시작하기</a>
            {/*<a id={loginStyle.start} href={`/api/oauth2/authorization/kakao`}>동대문 Friends 시작하기</a>*/}
            <p>
                나의 소중한 동대문 친구들을 위해 준비했습니다.<br/>
                이 웹 서비스는 오직 동대문이라는 특별한 공간과 그곳의 사람들을 위한 맞춤형 플랫폼입니다.<br/>
                익숙한 거리, 정겨운 사람들, 그리고 함께한 추억이 담긴 이 공간 속에서<br/>
                우리는 다시 연결되고, 소통하며, 더 나은 일상을 함께 만들어갑니다.<br/>
                동대문 친구들만을 위한 특별한 경험, 지금 시작해보세요.
            </p>
        </div>
    );
}
export default Login;