import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage'; // 예시 페이지
import ContentPage from './pages/ContentPage';
import ContentReviewsPage from './pages/ContentReviewsPage';
import PlayListPage from './pages/PlayListPage';
import PlayListDetailPage from './pages/PlayListDetailPage';
import ProfilePage from './pages/ProfilePage';
import PlayListCreatePage from './pages/PlaylistCreatePage.tsx';
import PlaylistEditPage from './pages/PlaylistEditPage.tsx';

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
          <Route path="/contents/:contentId" element={<ContentPage />} />
          <Route path="/contents/:contentId/reviews" element={<ContentReviewsPage />} />
          <Route path="/playlists" element={<PlayListPage />} />
          <Route path="/playlists/:playListId" element={<PlayListDetailPage />} />
          <Route path="/playlists/new" element={<PlayListCreatePage />} />
          <Route path="/playlists/:playListId/edit" element={<PlaylistEditPage />} />
          <Route path="/profiles" element={<ProfilePage />} />
          <Route path="/profiles/:userId" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
