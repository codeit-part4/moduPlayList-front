import React from 'react';
import styled from 'styled-components';
import type { PlaylistResponse } from '../../type/playlists';
import { Avatar } from '../common/Avatar';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  cursor: pointer;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  width: 280px;
  flex: 0 0 auto;

    &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const Description = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const UserName = styled.span`
  font-size: 14px;
  color: #555;
  font-weight: 500;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #888;
  gap: 8px;
  
  span {
    white-space: nowrap;
  }
`;

const PublicBadge = styled.span<{ isPublic: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => props.isPublic ? '#e3f2fd' : '#f5f5f5'};
  color: ${props => props.isPublic ? '#1976d2' : '#757575'};
`;

interface PlayListCardProps {
  playlist: PlaylistResponse;
  disableClick?: boolean;
}

export const PlayListCard: React.FC<PlayListCardProps> = ({
  playlist,
  disableClick
}) => {
  const navigate = useNavigate();
  const id = playlist.id;

  const handleClick = (e: React.MouseEvent) => {
    if (disableClick) {
      e.preventDefault();
      return;
    }
    navigate(`/playlists/${id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card onClick={handleClick}>
      <Title>{playlist.title}</Title>
      <Description>{playlist.description}</Description>
      <UserInfo>
        <Avatar
          // src={playlist.user.profileImage}
          // alt={playlist.user.nickname}
          // size={32}
        />
        <UserName>{playlist.user.nickname}</UserName>
      </UserInfo>
      <Stats>
        <PublicBadge isPublic={playlist.isPublic}>
          {playlist.isPublic ? '공개' : '비공개'}
        </PublicBadge>
        <span>구독자 {playlist.subscribeCount}명</span>
        <span>수정일: {formatDate(playlist.updatedAt)}</span>
      </Stats>
    </Card>
  );
};

export default PlayListCard;
