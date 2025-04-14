import loginStyle from './login.module.css';
const Login = () => {
    return (
        <div id={loginStyle.login}>
            <h1>동대문 Killer</h1>
            <a href="http://218.39.156.143/oauth2/authorization/kakao">동대문 Killer 시작하기</a>
        </div>
    );
}
export default Login;