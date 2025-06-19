import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Auth from './pages/auth/Auth'
import MainRouter from './router/MainRouter'
import AuthRouter from './router/AuthRouter'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const themeMode:string = useSelector((state: RootState) => state.theme.mode);
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }
  ,[]);
  
  useEffect(() => {
    if(themeMode === 'dark') {
      document.documentElement.style.backgroundColor = '#161618';
      document.documentElement.style.color = '#ffffff';
    }else{
      document.documentElement.style.backgroundColor = '';
      document.documentElement.style.color = '';
    }
  }, [themeMode]);

  return isLogin ? <MainRouter /> : <AuthRouter />;
}
export default App