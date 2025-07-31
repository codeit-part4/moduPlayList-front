import React from 'react'
import styled from 'styled-components'
import { Rating } from './common/Rating.tsx'
import { useNavigate } from 'react-router-dom';

interface ContentCardProps {
  id: string;
  image?: string;
  category: string;
  title: string;
  description: string;
  rating: number;
  totalRatingCount: number;
  viewers: number;
  disableClick?: boolean;
}

const Card = styled.div`
  width: 220px;
  background: #fff;
  display: flex;
  flex-direction: column;
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
  height: 300px;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FallbackImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #999;
`;

const CardBody = styled.div`
  position: relative;
  padding: 16px 16px 48px;
  height: 100%;
`;

const BottomInfo = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const Description = styled.div`
  color: #888;
  font-size: 13px;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;  /* limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  max-height: calc(1.4em * 2); /* line-height * number of lines */
`;

const Viewers = styled.div`
  color: #3b82f6;
  font-size: 12px;
`;

const ContentCard: React.FC<ContentCardProps> = ({ id, image, category, title, description, rating, totalRatingCount, viewers, disableClick
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
        {image ? (
          <img
            src={image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <FallbackImage>🎬</FallbackImage>
        )}
      </ImageBox>
      <CardBody>
        <Category>{category}</Category>
        <Title>{title}</Title>
        <Description>{description}</Description>

        <BottomInfo>
          <Rating score={rating ?? 0}>
            {(rating ?? 0).toFixed(1)}{' '}
            <span style={{ fontWeight: 'normal', fontSize: '13px' }}>
              ({totalRatingCount})
            </span>
          </Rating>
          <Viewers>지금 {viewers}명이 보고 있어요.</Viewers>
        </BottomInfo>
      </CardBody>
    </Card>
  );
}

export default ContentCard;
