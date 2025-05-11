import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Auth from './pages/auth/Auth'
import MainRouter from './router/MainRouter'
import AuthRouter from './router/AuthRouter'

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    console.log(token)
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }
  ,[]);

  return isLogin ? <MainRouter /> : <AuthRouter />;
}
export default App