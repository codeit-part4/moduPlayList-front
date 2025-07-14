// components/ContentDetailInfo.tsx
import React from 'react';
import styled from 'styled-components';
import type { Content } from '../type/contents.ts';
import { Rating } from './common/Rating.tsx';

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
    height: 320px;
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
  display: flex;
  gap: 16px;
  font-size: 14px;
`;

interface ContentDetailInfoProps {
  content: Content;
}

const ContentDetailInfo: React.FC<ContentDetailInfoProps> = ({ content }) => {
  return (
    <Container>
      <ImageContainer>
        <img src={content.image} alt={content.title} />
      </ImageContainer>
      <InfoContainer>
        <Category>{content.category}</Category>
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>
        <Stats>
          <Rating score={content.rating}>{content.rating.toFixed(1)}</Rating>
          <span>조회수 {content.viewers.toLocaleString()}회</span>
        </Stats>
      </InfoContainer>
    </Container>
  );
};

export default ContentDetailInfo;
