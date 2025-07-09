import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api';

const TopbarContainer = styled.div`
    height: 60px;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 24px;
    border-bottom: 1px solid #ddd;
`;

const ProfileIcon = styled(Link)`
    margin-left: 10px;
    font-size: 22px;
    color: inherit;
    text-decoration: none;
    vertical-align: middle;
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

const Topbar: React.FC = () => {
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
        <TopbarContainer>
            <div />
            <div>
                🔔 <span style={{ margin: '0 10px' }}>1</span>
                <ProfileIcon to={`/${userName || ''}`}>👤</ProfileIcon>
            </div>
        </TopbarContainer>
    );
};

export default Topbar; 