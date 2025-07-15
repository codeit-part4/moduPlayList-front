import React from 'react';
import styled from 'styled-components';
import type { PlaylistResponse } from '../../type/playlists';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const Title = styled.h2`
  margin: 0 0 12px 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const CuratorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
`;

const Avatar = styled.div<{ profileImage?: string }>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${props => props.profileImage ? `url(${props.profileImage})` : '#bbb'};
  background-size: cover;
  background-position: center;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const CuratorName = styled.span`
  font-weight: 600;
  font-size: 17px;
`;

const Subscriber = styled.div`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
`;

const SubscribeBtn = styled.button`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  color: #3b82f6;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.2s ease;
  width: fit-content;
  
  &:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const DescriptionSection = styled.div`
  margin-top: 8px;
`;

const DescTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
`;

const Description = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  line-height: 1.5;
`;

interface PlayListInfoProps {
  playlist: PlaylistResponse;
  onSubscribe?: () => void;
}

const PlayListInfo: React.FC<PlayListInfoProps> = ({ playlist, onSubscribe }) => (
  <InfoContainer>
    <Title>{playlist.title}</Title>
    <CuratorBox>
      <Avatar
        // profileImage={playlist.user.profileImage}
      />
      <CuratorName>{playlist.user.nickname}</CuratorName>
    </CuratorBox>
    <Subscriber>구독자: {playlist.subscribeCount}명</Subscriber>
    <SubscribeBtn onClick={onSubscribe}>구독하기</SubscribeBtn>
    <DescriptionSection>
      <DescTitle>설명</DescTitle>
      <Description>{playlist.description}</Description>
    </DescriptionSection>
  </InfoContainer>
);

export default PlayListInfo;