import React from 'react';
import styled from 'styled-components';

interface ContentCardProps {
  image?: string;
  category: string;
  title: string;
  description: string;
  rating: number;
  viewers: number;
}

const Card = styled.div`
  width: 220px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
`;

const ImageBox = styled.div`
  width: 100%;
  height: 160px;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardBody = styled.div`
  padding: 16px;
`;

const Category = styled.div`
  color: #6e56cf;
  font-size: 12px;
  margin-bottom: 4px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
    color: #333;
`;

const Description = styled.div`
  color: #888;
  font-size: 13px;
  margin-bottom: 8px;
`;

const Rating = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 4px;
    color: red;
`;

const Viewers = styled.div`
  color: #3b82f6;
  font-size: 12px;
`;

const ContentCard: React.FC<ContentCardProps> = ({ image, category, title, description, rating, viewers }) => (
  <Card>
    <ImageBox>
      {image ? <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>🖼️</span>}
    </ImageBox>
    <CardBody>
      <Category>{category}</Category>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Rating>{rating} <span style={{ fontWeight: 'normal', fontSize: '13px' }}>(113)</span></Rating>
      <Viewers>지금 {viewers}명이 보고 있어요.</Viewers>
    </CardBody>
  </Card>
);

export default ContentCard;
