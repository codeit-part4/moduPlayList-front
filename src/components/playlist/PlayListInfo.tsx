import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { PlaylistResponse } from '../../type/playlists';
import { API_BASE_URL } from '../../api';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
`;

const CuratorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #bbb;
`;

const CuratorName = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

const Subscriber = styled.div`
  font-size: 15px;
`;

const SubscribeBtn = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 15px;
  cursor: pointer;
  padding: 0;
`;

const DescTitle = styled.div`
  font-weight: bold;
  margin-top: 8px;
`;

const Description = styled.div`
  color: #888;
  font-size: 14px;
  margin-left: 16px;
`;

interface PlayListInfoProps {
  playlist?: PlaylistResponse;
}

const PlayListInfo: React.FC<PlayListInfoProps> = ({ playlist }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loadingSub, setLoadingSub] = useState(true);
  const [subscribeCount, setSubscribeCount] = useState(playlist?.subscribeCount ?? 0);

  // 구독자 수 최신화 함수
  const fetchSubscribeCount = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/subscribes/playlists/${id}/count`);
      if (res.ok) {
        const data = await res.json();
        setSubscribeCount(data.count ?? 0);
      }
    } catch {}
  };

  useEffect(() => {
    setSubscribeCount(playlist?.subscribeCount ?? 0);
  }, [playlist]);

  useEffect(() => {
    const checkSubscribe = async () => {
      if (!playlist) return;
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setIsSubscribed(false);
        setLoadingSub(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/subscribes/playlists/${playlist.id}/check`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setIsSubscribed(!!data.isSubscribed);
        } else {
          setIsSubscribed(false);
        }
      } catch {
        setIsSubscribed(false);
      } finally {
        setLoadingSub(false);
      }
    };
    checkSubscribe();
  }, [playlist]);

  if (!playlist) {
    return <InfoContainer>플레이리스트 정보를 찾을 수 없습니다.</InfoContainer>;
  }

  const handleSubscribe = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/subscribes/playlists/${playlist.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        alert('구독이 완료되었습니다!');
        setIsSubscribed(true);
        fetchSubscribeCount(playlist.id);
      } else {
        const data = await res.json();
        alert(data.message || '구독에 실패했습니다.');
      }
    } catch (err) {
      alert('서버와 연결할 수 없습니다.');
    }
  };

  return (
    <InfoContainer>
      <Title>{playlist.title}</Title>
      <CuratorBox>
        <Avatar />
        <CuratorName>{playlist.user.nickname}</CuratorName>
      </CuratorBox>
      <Subscriber>구독자: {subscribeCount}명</Subscriber>
      {loadingSub ? (
        <SubscribeBtn disabled>로딩중...</SubscribeBtn>
      ) : isSubscribed ? (
        <SubscribeBtn disabled>구독중</SubscribeBtn>
      ) : (
        <SubscribeBtn onClick={handleSubscribe}>구독하기</SubscribeBtn>
      )}
      <DescTitle>설명</DescTitle>
      <Description>{playlist.description}</Description>
    </InfoContainer>
  );
};

export default PlayListInfo; 