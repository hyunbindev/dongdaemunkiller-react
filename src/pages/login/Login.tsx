import loginStyle from './login.module.css';
const Login = () => {
    return (
        <div id={loginStyle.login}>
            <h1>동대문 Killer</h1>
            <a href="http://localhost:8080/oauth2/authorization/kakao">동대문 Killer 시작하기</a>
        </div>
    );
}
export default Login;