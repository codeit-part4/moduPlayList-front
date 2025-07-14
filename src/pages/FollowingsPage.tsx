import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_BASE_URL } from '../api';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 0;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FollowingUserCard = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 18px 24px;
  gap: 18px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #bbb;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 17px;
`;

const UserEmail = styled.div`
  color: #666;
  font-size: 15px;
`;

interface FollowingUser {
  userid: string;
  name: string;
  email: string;
}

const FollowingsPage: React.FC = () => {
  const [users, setUsers] = useState<FollowingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    fetch(`${API_BASE_URL}/api/follows/followings`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError('팔로잉 목록을 불러올 수 없습니다');
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Title>팔로잉</Title>
      {loading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div style={{ color: '#d00' }}>{error}</div>
      ) : (
        <List>
          {users.map(user => (
            <FollowingUserCard key={user.userid}>
              <Avatar />
              <UserInfo>
                <UserName>{user.name}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserInfo>
            </FollowingUserCard>
          ))}
        </List>
      )}
    </Container>
  );
};

export default FollowingsPage; 