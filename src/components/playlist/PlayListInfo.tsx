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

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 15px;
`;

const Subscriber = styled.div`
  font-size: 15px;
`;

const LikeCount = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
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
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);

  // 공통 함수들
  const getAccessToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return null;
    }
    return token;
  };

  const handleApiError = (error: any, message: string) => {
    console.error(message, error);
    alert('서버와 연결할 수 없습니다.');
  };

  // 좋아요 수 가져오기
  const fetchLikeCount = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/playlists/${id}/likes`);
      if (res.ok) {
        const count = await res.json();
        setLikeCount(count);
      }
    } catch (error) {
      console.error('좋아요 수를 가져오는데 실패했습니다:', error);
    }
  };

  // 내 좋아요 상태 확인
  const checkMyLikeStatus = async (id: string) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setIsLiked(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/playlists/${id}/likes/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setIsLiked(data);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.error('좋아요 상태 확인에 실패했습니다:', error);
      setIsLiked(false);
    }
  };

  // 좋아요 추가
  const addLike = async (id: string) => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    setLoadingLike(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/playlists/${id}/likes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      } else {
        alert('좋아요 추가에 실패했습니다.');
      }
    } catch (error) {
      handleApiError(error, '좋아요 추가에 실패했습니다.');
    } finally {
      setLoadingLike(false);
    }
  };

  // 좋아요 취소
  const removeLike = async (id: string) => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    setLoadingLike(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/playlists/${id}/likes`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        setIsLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        alert('좋아요 취소에 실패했습니다.');
      }
    } catch (error) {
      handleApiError(error, '좋아요 취소에 실패했습니다.');
    } finally {
      setLoadingLike(false);
    }
  };

  // 좋아요 토글
  const handleLikeToggle = async () => {
    if (!playlist?.id || loadingLike) return;
    
    if (isLiked) {
      await removeLike(playlist.id);
    } else {
      await addLike(playlist.id);
    }
  };

  // 구독자 수 최신화 함수
  const fetchSubscribeCount = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/subscribes/playlists/${id}/count`);
      if (res.ok) {
        const data = await res.json();
        setSubscribeCount(data.count ?? 0);
      }
    } catch (error) {
      console.error('구독자 수를 가져오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    setSubscribeCount(playlist?.subscribeCount ?? 0);
    if (playlist?.id) {
      fetchLikeCount(playlist.id);
      checkMyLikeStatus(playlist.id);
    }
  }, [playlist]);

  useEffect(() => {
    const checkSubscribe = async () => {
      if (!playlist) return;
      const accessToken = getAccessToken();
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
      } catch (error) {
        console.error('구독 상태 확인에 실패했습니다:', error);
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
    const accessToken = getAccessToken();
    if (!accessToken) return;

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
    } catch (error) {
      handleApiError(error, '구독에 실패했습니다.');
    }
  };

  const handleUnsubscribe = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/subscribes/playlists/${playlist.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        alert('구독이 취소되었습니다.');
        setIsSubscribed(false);
        fetchSubscribeCount(playlist.id);
      } else {
        const data = await res.json();
        alert(data.message || '구독 취소에 실패했습니다.');
      }
    } catch (error) {
      handleApiError(error, '구독 취소에 실패했습니다.');
    }
  };

  return (
    <InfoContainer>
      <Title>{playlist.title}</Title>
      <CuratorBox>
        <Avatar />
        <CuratorName>{playlist.user.nickname}</CuratorName>
      </CuratorBox>
      <StatsContainer>
        <Subscriber>구독자: {subscribeCount}명</Subscriber>
        <LikeCount>
          <LikeButton 
            onClick={handleLikeToggle} 
            disabled={loadingLike}
            style={{ color: isLiked ? '#ff4757' : '#666' }}
          >
            👍 {likeCount}명
          </LikeButton>
        </LikeCount>
      </StatsContainer>
      {loadingSub ? (
        <SubscribeBtn disabled>로딩중...</SubscribeBtn>
      ) : isSubscribed ? (
        <SubscribeBtn onClick={handleUnsubscribe}>구독 취소</SubscribeBtn>
      ) : (
        <SubscribeBtn onClick={handleSubscribe}>구독하기</SubscribeBtn>
      )}
      <DescTitle>설명</DescTitle>
      <Description>{playlist.description}</Description>
    </InfoContainer>
  );
};

export default PlayListInfo; 