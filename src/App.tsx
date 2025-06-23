import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage'; // 예시 페이지

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 인증 관련 페이지는 Layout 없이 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 로그인 이후 공통 Layout 적용 */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          {/* 필요시 페이지 더 추가 */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;