import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserProfileInfo from '../components/UserProfileInfo';
import PlayListCard from '../components/PlayListCard';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api';

const Section = styled.div`
  margin-bottom: 32px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 40px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666;
`;

const ErrorContainer = styled.div`
  padding: 48px;
  text-align: center;
  font-size: 22px;
  color: #d00;
`;

const dummyPlayLists = [
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
];

interface UserData {
  name: string;
  userid: string;
}

const ProfilePage: React.FC = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  
  // 상태 관리
  const [isLoading, setIsLoading] = useState(true);
  const [isMe, setIsMe] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // DM방 생성 및 이동
  const handleOpenMessage = async () => {
    if (!userData?.userid) return;
    
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/dm/${userData.userid}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        const roomId = data.roomId || data.id;
        if (roomId) {
          navigate(`/dm/${roomId}`);
        } else {
          alert('DM방 생성에 실패했습니다');
        }
      } else {
        alert('DM방 생성에 실패했습니다');
      }
    } catch (e) {
      alert('서버와 연결할 수 없습니다');
    }
  };

  // 현재 로그인한 사용자 정보 가져오기
  const fetchCurrentUser = async (): Promise<UserData | null> => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (res.ok) {
        return await res.json();
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  // 특정 사용자 정보 가져오기
  const fetchUserByUsername = async (username: string): Promise<UserData | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/username/${username}`);
      
      if (res.status === 404) {
        return null;
      }
      
      if (res.ok) {
        return await res.json();
      }
      
      return null;
    } catch (e) {
      return null;
    }
  };

  // 팔로우 상태 확인
  const checkFollowStatus = async (followeeId: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/follows/${followeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setIsFollowing(res.ok);
    } catch (e) {
      setIsFollowing(false);
    }
  };

  // 메인 데이터 로딩 로직
  useEffect(() => {
    const loadUserData = async () => {
      if (!userName) {
        setError('사용자명이 필요합니다');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setNotFound(false);

      try {
        // 현재 로그인한 사용자 정보 가져오기
        const currentUser = await fetchCurrentUser();
        
        if (currentUser && currentUser.name === userName) {
          // 내 프로필인 경우
          setIsMe(true);
          setUserData(currentUser);
          setNotFound(false);
        } else {
          // 다른 사용자의 프로필인 경우
          setIsMe(false);
          const targetUser = await fetchUserByUsername(userName);
          
          if (targetUser) {
            setUserData(targetUser);
            setNotFound(false);
            // 팔로우 상태 확인
            await checkFollowStatus(targetUser.userid);
          } else {
            setNotFound(true);
            setUserData(null);
          }
        }
      } catch (e) {
        setError('사용자 정보를 불러오는데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [userName]);

  // 로딩 중
  if (isLoading) {
    return <LoadingContainer>사용자 정보를 불러오는 중...</LoadingContainer>;
  }

  // 에러 발생
  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  // 사용자를 찾을 수 없음
  if (notFound) {
    return <ErrorContainer>존재하지 않는 사용자입니다.</ErrorContainer>;
  }

  // 사용자 데이터가 없는 경우
  if (!userData) {
    return <ErrorContainer>사용자 정보를 불러올 수 없습니다.</ErrorContainer>;
  }

  return (
    <div>
      <Section>
        <UserProfileInfo
          isMe={isMe}
          name={userData.name}
          followeeId={userData.userid}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          userId={userData.userid}
        />
      </Section>
      <Section>
        <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px'}}>플레이리스트</div>
        <CardGrid>
          {dummyPlayLists.map((item, idx) => (
            <PlayListCard key={idx} {...item} />
          ))}
        </CardGrid>
      </Section>
      <Section>
        <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px'}}>구독 중인 플레이리스트</div>
        <CardGrid>
          {dummyPlayLists.map((item, idx) => (
            <PlayListCard key={idx} {...item} />
          ))}
        </CardGrid>
      </Section>
    </div>
  );
};

export default ProfilePage;
