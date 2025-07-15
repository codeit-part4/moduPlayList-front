import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import type { PlaylistResponse } from '../type/playlists';
import { fetchPlaylistById, fetchPlaylistContents } from '../api';
import PlayListInfo from '../components/playlist/PlayListInfo';
import { BackButton } from '../components/common/BackButton.tsx';
import type { Content } from '../type/contents';
import ContentCard from '../components/ContentCard.tsx';

const DetailLayout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 40px;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: #666;
`;

const ErrorMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: #ff4444;
`;

const EmptyContent = styled.div`
  text-align: center;
  padding: 48px 20px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;
`;

const EmptyTitle = styled.h3`
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
`;

const EmptyDescription = styled.p`
  color: #666;
  margin-bottom: 16px;
`;

const AddButton = styled.button`
  background: #6e56cf;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: #5842be;
  }
`;

const PlayListDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { playlistId } = useParams<{ playlistId: string }>();
  const [playlist, setPlaylist] = useState<PlaylistResponse | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentsLoading, setIsContentsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contentsError, setContentsError] = useState<string | null>(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddContent = () => {
    navigate(`/playlists/${playlistId}/edit`);
  };

  useEffect(() => {
    const loadPlaylist = async () => {
      if (!playlistId) {
        setError('플레이리스트 ID가 유효하지 않습니다.');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchPlaylistById(playlistId);
        setPlaylist(data);
      } catch (err) {
        setError('플레이리스트를 불러오는데 실패했습니다. 다시 시도해 주세요.');
        console.error('Failed to load playlist:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const loadContents = async () => {
      if (!playlistId) return;

      try {
        setIsContentsLoading(true);
        setContentsError(null);
        const data = await fetchPlaylistContents(playlistId);
        setContents(data);
      } catch (err) {
        setContentsError('콘텐츠를 불러오는데 실패했습니다.');
        console.error('Failed to load contents:', err);
      } finally {
        setIsContentsLoading(false);
      }
    };

    loadPlaylist();
    loadContents();
  }, [playlistId]);

  return (
    <DetailLayout>
      <BackButton onClick={handleBack}>
        목록으로 돌아가기
      </BackButton>
      <Section>
        {isLoading && (
          <LoadingMessage>플레이리스트를 불러오는 중...</LoadingMessage>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!isLoading && !error && playlist && (
          <PlayListInfo playlist={playlist} />
        )}
      </Section>
      <Section>
        <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px'}}>콘텐츠 목록</div>
        {isContentsLoading ? (
          <LoadingMessage>콘텐츠를 불러오는 중...</LoadingMessage>
        ) : contentsError ? (
          <ErrorMessage>{contentsError}</ErrorMessage>
        ) : contents.length === 0 ? (
          <EmptyContent>
            <EmptyTitle>아직 추가된 콘텐츠가 없습니다</EmptyTitle>
            <EmptyDescription>
              새로운 콘텐츠를 추가하여 플레이리스트를 채워보세요
            </EmptyDescription>
            <AddButton onClick={handleAddContent}>
              콘텐츠 추가하기
            </AddButton>
          </EmptyContent>
        ) : (
          <CardGrid>
            {contents.map((item) => (
              <ContentCard key={item.id} {...item} />
            ))}
          </CardGrid>
        )}
      </Section>
    </DetailLayout>
  );
};

export default PlayListDetailPage;
