import React from 'react';
import styled from 'styled-components';

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

const PlayListInfo: React.FC = () => (
  <InfoContainer>
    <Title>{'{플레이리스트 제목}'}</Title>
    <CuratorBox>
      <Avatar />
      <CuratorName>woody</CuratorName>
    </CuratorBox>
    <Subscriber>구독자: 00명</Subscriber>
    <SubscribeBtn>구독하기</SubscribeBtn>
    <DescTitle>설명</DescTitle>
    <Description>{'(플레이리스트 설명)'}</Description>
  </InfoContainer>
);

export default PlayListInfo; 