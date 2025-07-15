import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import type { PlaylistResponse } from '../type/playlists';
import { fetchPlaylistById } from '../api';
import PlayListInfo from '../components/playlist/PlayListInfo';

const Container = styled.div`
  padding: 20px;
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

const PlayListDetailPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const [playlist, setPlaylist] = useState<PlaylistResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    loadPlaylist();
  }, [playlistId]);

  return (
    <Container>
      {isLoading && (
        <LoadingMessage>플레이리스트를 불러오는 중...</LoadingMessage>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!isLoading && !error && playlist && (
        <PlayListInfo playlist={playlist} />
      )}
    </Container>
  );
};

export default PlayListDetailPage;