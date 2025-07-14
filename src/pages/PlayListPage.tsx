import React from 'react';
import styled from 'styled-components';
import ContentSearchBar from '../components/ContentSearchBar';
import PlayListCard from '../components/playlist/PlayListCard.tsx';
import { samplePlaylistResponses } from '../type/playlists.ts';

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const PlayListPage: React.FC = () => {
  return (
    <div>
      <ContentSearchBar onSearch={function(): void {
              throw new Error('Function not implemented.');
          } } />
      <CardGrid>
        {samplePlaylistResponses.map((item, idx) => (
          <PlayListCard key={idx} playlist={item} disableClick={false} />
        ))}
      </CardGrid>
    </div>
  );
};

export default PlayListPage;
