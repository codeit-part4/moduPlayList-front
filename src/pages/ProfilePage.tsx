import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserProfileInfo from '../components/UserProfileInfo';
import PlayListCard from '../components/playlist/PlayListCard.tsx';
import { samplePlaylistResponses } from '../type/playlists.ts';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../api';

const Section = styled.div`
  margin-bottom: 32px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const ProfilePage: React.FC = () => {
  const { userName } = useParams();
  const [isMe, setIsMe] = useState(false);
  const [name, setName] = useState(userName || '');
  const [notFound, setNotFound] = useState(false);
  const [followeeId, setFolloweeId] = useState<string | undefined>(undefined);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [subscribedPlaylists, setSubscribedPlaylists] = useState<any[]>([]);
  const [loadingSubscribed, setLoadingSubscribed] = useState(true);
  const [errorSubscribed, setErrorSubscribed] = useState<string | null>(null);

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
        .then(res => {
          if (res.status === 404) {
            setNotFound(true);
            setName(userName);
            setFolloweeId(undefined);
            setUserId(undefined);
            return null;
          }
          return res.json();
        })
        .then(data => {
          if (data && data.name) setName(data.name);
          if (data && data.userid) {
            setFolloweeId(data.userid);
            setUserId(data.userid);
          }
        })
        .catch(() => setNotFound(true));
    } else {
      setNotFound(false);
      setFolloweeId(undefined);
      // 내 프로필이면 userId는 위에서 이미 세팅됨
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
    const fetchSubscribed = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setSubscribedPlaylists([]);
        setLoadingSubscribed(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/subscribes/my`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) throw new Error('구독중인 플레이리스트를 불러오지 못했습니다');
        const data = await res.json();
        // playlist.user.userName을 playlist.user.nickname으로 변환
        const mapped = data.map((item: any) => ({
          ...item.playlist,
          user: {
            ...item.playlist.user,
            nickname: item.playlist.user.userName,
          },
        }));
        setSubscribedPlaylists(mapped);
      } catch (err: any) {
        setErrorSubscribed(err.message || '에러가 발생했습니다');
      } finally {
        setLoadingSubscribed(false);
      }
    };
    fetchSubscribed();
  }, []);

  if (notFound) {
    return <div style={{ padding: '48px', textAlign: 'center', fontSize: '22px', color: '#d00' }}>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div>
      <Section>
        <UserProfileInfo isMe={isMe} name={name} followeeId={followeeId} isFollowing={isFollowing} setIsFollowing={setIsFollowing} userId={userId} />
      </Section>
      <Section>
        <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px'}}>플레이리스트</div>
        <CardGrid>
          {samplePlaylistResponses.map((item, idx) => (
            <PlayListCard key={idx} playlist={item} />
          ))}
        </CardGrid>
      </Section>
      <Section>
        <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px'}}>구독 중인 플레이리스트</div>
        <CardGrid>
          {loadingSubscribed ? (
            <div>로딩 중...</div>
          ) : errorSubscribed ? (
            <div style={{ color: 'red' }}>{errorSubscribed}</div>
          ) : (
            subscribedPlaylists.map((item, idx) => (
              <PlayListCard key={item.id || idx} playlist={item} />
            ))
          )}
        </CardGrid>
      </Section>
    </div>
  );
};

export default ProfilePage;