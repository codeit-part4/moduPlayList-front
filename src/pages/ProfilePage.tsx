import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserProfileInfo from '../components/UserProfileInfo';
import PlayListCard from '../components/PlayListCard';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../api';

const Section = styled.div`
  margin-bottom: 32px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 40px;
`;

const dummyPlayLists = [
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
];

const ProfilePage: React.FC = () => {
  const { userName } = useParams();
  const [isMe, setIsMe] = useState(false);
  const [name, setName] = useState(userName || '');
  const [notFound, setNotFound] = useState(false);
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