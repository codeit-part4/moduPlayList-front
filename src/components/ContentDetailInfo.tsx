// components/ContentDetailInfo.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { Content } from '../type/contents.ts';
import { Rating } from './common/Rating.tsx';
import { API_BASE_URL } from '../api';

const Container = styled.div`
    display: flex;
    gap: 24px;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: var(--container-bg-color);
    color: var(--text-color);
`;

const ImageContainer = styled.div`
    width: 240px;
    height: 350px;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
    }
`;

const FallbackImage = styled.div`
  width: 100%;
  height: 350px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #999;
  border-radius: 4px;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Category = styled.div`
  color: #6e56cf;
  font-size: 14px;
  font-weight: 600;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
`;

const Description = styled.p`
  margin: 0;
  line-height: 1.6;
`;

const Stats = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  align-items: center;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
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

interface ContentDetailInfoProps {
  content: Content;
}

const ContentDetailInfo: React.FC<ContentDetailInfoProps> = ({ content }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);

  // 좋아요 수 가져오기
  const fetchLikeCount = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contents/${id}/likes`);
      if (res.ok) {
        const data = await res.json();
        setLikeCount(data.count);
      }
    } catch (error) {
      console.error('좋아요 수를 가져오는데 실패했습니다:', error);
    }
  };

  // 내 좋아요 상태 확인
  const checkMyLikeStatus = async (id: string) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setIsLiked(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/contents/${id}/likes/me`, {
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
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    setLoadingLike(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/contents/${id}/likes`, {
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
      alert('서버와 연결할 수 없습니다.');
    } finally {
      setLoadingLike(false);
    }
  };

  // 좋아요 취소
  const removeLike = async (id: string) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    setLoadingLike(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/contents/${id}/likes`, {
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
      alert('서버와 연결할 수 없습니다.');
    } finally {
      setLoadingLike(false);
    }
  };

  // 좋아요 토글
  const handleLikeToggle = async () => {
    if (!content?.id || loadingLike) return;
    
    if (isLiked) {
      await removeLike(content.id);
    } else {
      await addLike(content.id);
    }
  };

  useEffect(() => {
    if (content?.id) {
      fetchLikeCount(content.id);
      checkMyLikeStatus(content.id);
    }
  }, [content]);

  return (
    <Container>
      <ImageContainer>
        {content.posterUrl ? (
          <img src={content.posterUrl} alt={content.title} />
        ) : (
          <FallbackImage>🎬</FallbackImage>
        )}
      </ImageContainer>
      <InfoContainer>
        <Category>{content.category}</Category>
        <Title>{content.title}</Title>
        <Description>{content.summary}</Description>
        <Stats>
          <Rating score={content.averageRating ?? 0}>
            {(content.averageRating ?? 0).toFixed(1)}
          </Rating>
          <LikeButton
            onClick={handleLikeToggle}
            disabled={loadingLike}
            style={{ color: isLiked ? '#ff4757' : '#666' }}
          >
            👍 {likeCount}명
          </LikeButton>
        </Stats>
      </InfoContainer>
    </Container>
  );
};

export default ContentDetailInfo;
