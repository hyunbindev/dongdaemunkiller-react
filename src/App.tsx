import { useEffect, useState } from 'react';
import { createBrowserRouter, Outlet, redirect, RouterProvider, ScrollRestoration } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

import Login from './pages/login/Login';
import Auth from './pages/auth/Auth';
import RedirectionAuth from './pages/auth/RedirectionAuth';

import Main from './pages/main/Main';
import JudgmentPage from './pages/judgment/JudgmentPage';
import CreateJudgment from './components/judgment/create/CreateJudgment';
import JudgmentDetailPage from './pages/judgment/JudgmentDetailPage';
import BlamePage from './pages/blame/BlamePage';
import BlameDetailPage from './pages/blame/BlameDetailPage';
import PersonaPage from './pages/persona/PersonaPage';
import CreatePersona from './components/persona/create/CreatePersona';
import PersonaDetailPage from './pages/persona/detail/PersonaDetailPage';
import NewsPage from './pages/news/NewsPage';
import NewsDetailPage from './pages/news/NewsDetailPage';

import Footer from './components/common/footer/Footer';
import KeepAlive, { AliveScope } from 'react-activation';
import ErrorBoundary from './components/ErrorBoundary';
import NewsCreatePage from './pages/news/newCreatepage/NewsCreatePage'

function RootLayout() {
  return (
    <>
      <div>
        <AliveScope>
          <Outlet />
        </AliveScope>
      </div>
      <ScrollRestoration />
      <Footer />
    </>
  );
}

// 로그인 여부 확인 함수 (세션 토큰 기준)
function isAuthenticated() {
  return !!sessionStorage.getItem('accessToken');
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (isAuthenticated()) {
        // 이미 로그인 된 경우 메인 페이지로 리다이렉트
        throw redirect('/');
      }
      return null;
    }
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      if (!isAuthenticated()) {
        // 로그인 안 된 경우 로그인 페이지로 리다이렉트
        throw redirect('/login');
      }
      return null;
    },
    children: [
      { index: true, element: <Main /> },
      { path: "judgment", element: <KeepAlive when={() => {const judementState = /^\/judgment\/(?!create$)[^/]+$/.test(location.pathname);return judementState;}}><JudgmentPage /></KeepAlive> },
      { path: "judgment/create", element: <CreateJudgment /> },
      { path: "judgment/:judgmentId", element: <JudgmentDetailPage /> },
      { path: "blame", element: <KeepAlive when={() => {const isBlameDetail =/^\/blame\/(?!create$)[^/]+$/.test(location.pathname);return isBlameDetail;}}><BlamePage /></KeepAlive> },
      { path: "blame/:blameId", element: <BlameDetailPage /> },
      { path: "persona", element:  <KeepAlive when={() => {const personaState = /^\/persona\/(?!create$)[^/]+$/.test(location.pathname);return personaState;}}><PersonaPage /></KeepAlive> },
      { path: "persona/create", element: <CreatePersona /> },
      { path: "persona/:personaId", element: <PersonaDetailPage /> },
      { path: "news", element: <KeepAlive when={() => {const newsState = /^\/news\/(?!create$)[^/]+$/.test(location.pathname);return newsState;}}><NewsPage /></KeepAlive> },
      { path: "news/create", element: <NewsCreatePage /> },
      { path: "news/:newsId", element: <NewsDetailPage /> },
    ],
  },
  {
    path: "*",
    element: <RedirectionAuth />,
  }
]);

function App() {
  const themeMode: string = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.style.backgroundColor = '#161618';
      document.documentElement.style.color = '#ffffff';
    } else {
      document.documentElement.style.backgroundColor = '';
      document.documentElement.style.color = '';
    }
  }, [themeMode]);

  return (<ErrorBoundary>
              <RouterProvider router={router} />
          </ErrorBoundary>);
}

export default App;