import React from 'react'
import styled from 'styled-components'
import { Rating } from './common/Rating.tsx'
import { useNavigate } from 'react-router-dom';
import type { Content } from '../type/contents';

interface ContentCardProps extends Content {
  disableClick?: boolean;
}

const Card = styled.div`
  width: 220px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  cursor: pointer;
  transition: all 0.2s ease;
    
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
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
  height: 40px;
`;

const Viewers = styled.div`
  color: #3b82f6;
  font-size: 12px;
`;

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  image,
  category,
  title,
  description,
  rating,
  reviews,
  viewers,
  disableClick
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (disableClick) {
      e.preventDefault();
      return;
    }
    navigate(`/contents/${id}`);
  };

  return (
    <Card onClick={handleClick}>
      <ImageBox>
        {image ? <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>🖼️</span>}
      </ImageBox>
      <CardBody>
        <Category>{category}</Category>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Rating $score={rating}>{rating.toFixed(1)} <span style={{ fontWeight: 'normal', fontSize: '13px' }}>({reviews})</span></Rating>
        <Viewers>지금 {viewers}명이 보고 있어요.</Viewers>
      </CardBody>
    </Card>
  );
}

export default ContentCard;
