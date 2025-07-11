import React from 'react';
import styled from 'styled-components';

interface PlayListCardProps {
  title: string;
  description: string;
  updated: string;
  subscribers: string;
}

const Card = styled.div`
  width: 220px;
  background: #f5f3fa;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  padding: 24px 18px;
`;

const Title = styled.div`
  color: #1a1a1a;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-size: 14px;
  color: #222;
  margin-bottom: 10px;
`;

const Info = styled.div`
  font-size: 13px;
  color: #444;
  margin-bottom: 2px;
  font-weight: bold;
`;

const PlayListCard: React.FC<PlayListCardProps> = ({ title, description, updated, subscribers }) => (
  <Card>
    <Title>{title}</Title>
    <Description>{description}</Description>
    <Info>{updated}</Info>
    <Info>{subscribers}</Info>
  </Card>
);

export default PlayListCard;
