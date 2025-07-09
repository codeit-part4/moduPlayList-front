import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
`;

const ImageBox = styled.div`
  width: 200px;
  height: 280px;
  background: #ccc;
  border-radius: 8px;
`;

const InfoBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
`;

const Category = styled.div`
  color: #6e56cf;
  font-size: 14px;
  margin-bottom: 4px;
`;

const Rating = styled.div`
  font-size: 16px;
  margin-bottom: 4px;
`;

const PlaylistLink = styled.a`
  color: #3b82f6;
  font-size: 14px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const Description = styled.div`
  color: #888;
  font-size: 14px;
`;

const ContentDetailInfo: React.FC = () => (
  <Container>
    <ImageBox />
    <InfoBox>
      <Title>{'{콘텐츠 제목}'}</Title>
      <Category>{'(카테고리)'}</Category>
      <Rating>4.7점 (113)</Rating>
      <PlaylistLink>내 플레이리스트에 추가하기</PlaylistLink>
      <Description>{'(콘텐츠 설명)'}</Description>
    </InfoBox>
  </Container>
);

export default ContentDetailInfo; 