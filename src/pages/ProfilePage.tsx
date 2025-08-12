import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserProfileInfo from '../components/UserProfileInfo';
import PlayListCard from '../components/playlist/PlayListCard.tsx';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../api/api.ts';

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
  const [myPlaylists, setMyPlaylists] = useState<any[]>([]);
  const [loadingMyPlaylists, setLoadingMyPlaylists] = useState(true);
  const [errorMyPlaylists, setErrorMyPlaylists] = useState<string | null>(null);


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

  useEffect(() => {
    const fetchMyPlaylists = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/playlists/user/${userId}`);
        if (!res.ok) throw new Error('내 플레이리스트를 불러오지 못했습니다');

        const data = await res.json();

        // 본인인 경우 전체 보여주고, 다른 사람인 경우 공개된 것만 보여줌
        const filtered = isMe ? data : data.filter((item: any) => item.isPublic);

        // user.nickname 필드 필요 시 변환
        const mapped = filtered.map((item: any) => ({
          ...item,
          user: {
            ...item.user,
            nickname: item.user.userName,
          },
        }));

        setMyPlaylists(mapped);
      } catch (err: any) {
        setErrorMyPlaylists(err.message || '에러가 발생했습니다');
      } finally {
        setLoadingMyPlaylists(false);
      }
    };

    fetchMyPlaylists();
  }, [userId, isMe]);

  if (notFound) {
    return <div style={{ padding: '48px', textAlign: 'center', fontSize: '22px', color: '#d00' }}>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div>
      <Section>
        <UserProfileInfo isMe={isMe} name={name} followeeId={followeeId} isFollowing={isFollowing} setIsFollowing={setIsFollowing} userId={userId} />
      </Section>
      <Section>
        <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px'}}>내 플레이리스트</div>
        <CardGrid>
          {loadingMyPlaylists ? (
            <div>로딩 중...</div>
          ) : errorMyPlaylists ? (
            <div style={{ color: 'red' }}>{errorMyPlaylists}</div>
          ) : (
            myPlaylists.map((item, idx) => (
              <PlayListCard key={item.id || idx} playlist={item} />
            ))
          )}
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
