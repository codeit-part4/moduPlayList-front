import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api';

const SidebarContainer = styled.div`
    width: 190px;
    min-width: 190px;
    border-right: 1px solid #e9ecef;
    padding: 20px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto; // 내용이 많을 경우 스크롤 가능하도록
`;

const MenuItem = styled(Link)`
        margin-bottom: 16px;
        font-size: 14px;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        gap: 8px;
        
        &:hover {
                color: #866bff;
        }
`;

const Title = styled(Link)`
    font-size: 24px;
    font-weight: bold;
    color: inherit;
    text-decoration: none;
    display: block;
    margin-bottom: 24px;
    &:hover {
        color: #866bff;
    }
`;

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

const Sidebar: React.FC = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
      let name = '';
      const token = localStorage.getItem('accessToken');
      if (token) {
        const payload = parseJwt(token);
        if (payload && payload.name) {
          name = payload.name;
          setUserName(name);
        } else {
          // accessToken에 name이 없으면 /api/auth/me로 요청
          fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          })
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(data => {
              if (data && data.name) setUserName(data.name);
            })
            .catch(() => setUserName(''));
        }
      }
    }, []);

    return (
        <SidebarContainer>
            <Title to="/home">모두의 플리</Title>
            <MenuItem to={'/home'}>⭐ 콘텐츠 같이 보기</MenuItem>
            <MenuItem to={'/playlists'}>⭐ 플레이 리스트</MenuItem>
            <MenuItem to={`/${userName || ''}`}>⭐ 프로필</MenuItem>
            <MenuItem to={'/dm'}>⭐ DM</MenuItem>
        </SidebarContainer>
    );
};

export default Sidebar;
