// components/ContentDetailInfo.tsx
import React from 'react';
import styled from 'styled-components';
import { type Content, formatDate } from '../type/contents.ts';
import { Rating } from './common/Rating.tsx';
import { useContentLike } from '../hooks/useContentLike.ts'; // 새로 만든 훅 import

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
    gap: 16px;
    font-size: 14px;
`;

const InfoItem = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    color: #666;
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


const ReleaseDate = styled(InfoItem)`
  color: #444;
  font-weight: 500;
`;


interface ContentDetailInfoProps {
  content: Content;
}

const ContentDetailInfo: React.FC<ContentDetailInfoProps> = ({ content }) => {
  // 커스텀 훅을 사용하여 API 로직과 상태를 가져옴
  const { likeCount, isLiked, loadingLike, handleLikeToggle } = useContentLike(content.id);

  return (
    <Container>
      <ImageContainer>
        <img src={content.posterUrl} alt={content.title} />
      </ImageContainer>
      <InfoContainer>
        <Category>{content.category}</Category>
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>
        <ReleaseDate>
          <span>공개일:</span> {formatDate(content.releasedAt)}
        </ReleaseDate>
        <Stats>
          <Rating $score={content.rating ?? 0}>{(content.rating ?? 0).toFixed(1)}</Rating>
          <span>조회수 {content.viewers.toLocaleString()}회</span>
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
