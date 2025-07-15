import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateButton from '../components/common/CreateButton';
import type { PlaylistResponse } from '../type/playlists';
import { fetchPlaylists } from '../api';
import PlayListCard from '../components/playlist/PlayListCard';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 20px 0;
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

const PlayListPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<PlaylistResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchPlaylists();
        setPlaylists(data);
      } catch (err) {
        setError('플레이리스트를 불러오는데 실패했습니다. 다시 시도해 주세요.');
        console.error('Failed to load playlists:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  return (
    <div>
      <HeaderContainer>
        <Title>플레이리스트</Title>
        <CreateButton to="/playlists/new">
          플레이리스트 만들기
        </CreateButton>
      </HeaderContainer>

      {isLoading && (
        <LoadingMessage>플레이리스트를 불러오는 중...</LoadingMessage>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!isLoading && !error && (
        <PlaylistGrid>
          {playlists.map((playlist) => (
            <PlayListCard
              key={playlist.id}
              playlist={playlist}
            />
          ))}
        </PlaylistGrid>
      )}
    </div>
  );
};

export default PlayListPage;