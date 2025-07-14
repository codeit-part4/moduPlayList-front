import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_BASE_URL } from '../api';
import { useParams } from 'react-router-dom';
import UserProfileInfo from '../components/UserProfileInfo';

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

const FollowerUserCard = styled.div`
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

interface FollowerUser {
  userName: string;
  email: string;
}

const FollowerPage: React.FC = () => {
  const { userName } = useParams();
  const [users, setUsers] = useState<FollowerUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 추가: 프로필 정보 상태
  const [isMe, setIsMe] = useState(false);
  const [name, setName] = useState(userName || '');
  const [followeeId, setFolloweeId] = useState<string | undefined>(undefined);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          setIsMe(data.name === userName);
          if (data.name === userName) {
            setName(data.name);
            setUserId(data.userid);
          }
        })
        .catch(() => setIsMe(false));
    }
  }, [userName]);

  useEffect(() => {
    if (!isMe && userName) {
      fetch(`${API_BASE_URL}/api/users/username/${userName}`)
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          if (data && data.name) setName(data.name);
          if (data && data.userid) {
            setFolloweeId(data.userid);
            setUserId(data.userid);
          }
        })
        .catch(() => {});
    } else {
      setFolloweeId(undefined);
    }
  }, [isMe, userName]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (followeeId && token) {
      fetch(`${API_BASE_URL}/api/follows/${followeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.ok ? res.json() : false)
        .then(data => {
          setIsFollowing(!!data);
        })
        .catch(() => setIsFollowing(false));
    }
  }, [followeeId]);

  useEffect(() => {
    if (!userName) return;
    // 1. userId 조회
    fetch(`${API_BASE_URL}/api/users/username/${userName}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        if (!data.userid) throw new Error('userId 없음');
        // 2. userId로 팔로워 목록 조회
        return fetch(`${API_BASE_URL}/api/follows/followers/${data.userid}`);
      })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setUsers(data.content || []);
        setLoading(false);
      })
      .catch(() => {
        setError('팔로워 목록을 불러올 수 없습니다');
        setLoading(false);
      });
  }, [userName]);

  return (
    <Container>
      <UserProfileInfo isMe={isMe} name={name} followeeId={followeeId} isFollowing={isFollowing} setIsFollowing={setIsFollowing} userId={userId} />
      <Title>팔로워</Title>
      {loading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div style={{ color: '#d00' }}>{error}</div>
      ) : (
        <List>
          {users.map((user, idx) => (
            <FollowerUserCard key={user.userName + user.email + idx}>
              <Avatar />
              <UserInfo>
                <UserName>{user.userName}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserInfo>
            </FollowerUserCard>
          ))}
        </List>
      )}
    </Container>
  );
};

export default FollowerPage; 