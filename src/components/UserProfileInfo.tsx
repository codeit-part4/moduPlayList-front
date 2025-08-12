import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_BASE_URL } from '../api';
import { useNavigate } from 'react-router-dom';

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #bbb;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

const Follow = styled.div`
  font-size: 15px;
  margin-bottom: 4px;
`;

const BtnGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Btn = styled.button<{ following?: boolean }>`
  background: ${({ following }) => (following ? '#e5e7eb' : '#3b82f6')};
  color: ${({ following }) => (following ? '#222' : '#fff')};
  border: none;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
`;

const Status = styled.div`
  font-size: 15px;
  margin-top: 8px;
`;

interface UserProfileInfoProps {
  isMe: boolean;
  name: string;
  followeeId?: string;
  isFollowing: boolean;
  setIsFollowing: (v: boolean) => void;
  userId?: string;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ isMe, name, followeeId, isFollowing, setIsFollowing, userId }) => {
  const [followerCount, setFollowerCount] = useState(0);
  const [followeeCount, setFolloweeCount] = useState(0);
  const navigate = useNavigate();

  const fetchFollowCount = () => {
    if (!userId) return;
    fetch(`${API_BASE_URL}/api/follows/count/${userId}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setFollowerCount(data.followerCount);
        setFolloweeCount(data.followeeCount);
        console.log(data.followeeCount);
      })
      .catch(() => {
        setFollowerCount(0);
        setFolloweeCount(0);
      });
  };

  useEffect(() => {
    fetchFollowCount();
  }, [userId]);

  const handleFollow = async () => {
    if (!followeeId) return;
    const token = localStorage.getItem('accessToken');
    try {
      if (!isFollowing) {
        // 팔로우
        const res = await fetch(`${API_BASE_URL}/api/follows/${followeeId}`, {
          method: 'POST',
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          setIsFollowing(true);
          fetchFollowCount(); // 팔로우 후 새로고침
          alert('팔로우 완료!');
        } else {
          const data = await res.json();
          alert(data.message || '팔로우에 실패했습니다');
        }
      } else {
        // 언팔로우
        const res = await fetch(`${API_BASE_URL}/api/follows/${followeeId}`, {
          method: 'DELETE',
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          setIsFollowing(false);
          fetchFollowCount(); // 언팔로우 후 새로고침
          alert('언팔로우 완료!');
        } else {
          const data = await res.json();
          alert(data.message || '언팔로우에 실패했습니다');
        }
      }
    } catch (e) {
      alert('서버와 연결할 수 없습니다');
    }
  };

  const handleSendMessage = async () => {
    if (!userId) return;
    const token = localStorage.getItem('accessToken');
    
    try {
      // DM 방 생성 또는 기존 방 찾기
      const res = await fetch(`${API_BASE_URL}/api/dm/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        navigate('/dm');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'DM 방 생성에 실패했습니다');
      }
    } catch (e) {
      alert('서버와 연결할 수 없습니다');
    }
  };

  return (
    <ProfileBox>
      <Avatar />
      <Info>
        <Name>{name}</Name>
        <Follow>
          <span style={{ cursor: 'pointer', color: '#3b82f6', fontWeight: 'bold' }} onClick={() => navigate(`/${name}/follower`)}>
            팔로워 {followerCount}명
          </span>
          &nbsp;
          <span style={{ cursor: 'pointer', color: '#3b82f6', fontWeight: 'bold' }} onClick={() => navigate(`/${name}/followings`)}>
            팔로잉 {followeeCount}명
          </span>
        </Follow>
        {!isMe && (
          <BtnGroup>
            <Btn
              onClick={handleFollow}
              following={isFollowing}
            >
              {isFollowing ? '팔로잉' : '팔로우'}
            </Btn>
            <Btn 
              style={{ background: '#e5e7eb', color: '#222' }}
              onClick={handleSendMessage}
            >
              메시지 보내기
            </Btn>
          </BtnGroup>
        )}
        <Status>지금 <b>슈퍼맨</b>을 보고 있습니다.</Status>
      </Info>
    </ProfileBox>
  );
};

export default UserProfileInfo; 