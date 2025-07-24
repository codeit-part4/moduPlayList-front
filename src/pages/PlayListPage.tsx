import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentSearchBar from '../components/ContentSearchBar';
import PlayListCard from '../components/playlist/PlayListCard.tsx';
import { samplePlaylistResponses } from '../type/playlists.ts';
import { API_BASE_URL } from '../api';

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const PlayListPage: React.FC = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/playlists/`);
        if (!res.ok) throw new Error('플레이리스트를 불러오지 못했습니다');
        const data = await res.json();
        // user.userName을 user.nickname으로 변환
        const mapped = data.map((item: any) => ({
          ...item,
          user: {
            ...item.user,
            nickname: item.user.userName,
          },
        }));
        setPlaylists(mapped);
      } catch (err: any) {
        setError(err.message || '에러가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <ContentSearchBar onSearch={function(): void {
              throw new Error('Function not implemented.');
          } } />
      <CardGrid>
        {playlists.map((item: any, idx: number) => (
          <PlayListCard key={item.id || idx} playlist={item} disableClick={false} />
        ))}
      </CardGrid>
    </div>
  );
};

export default PlayListPage;
