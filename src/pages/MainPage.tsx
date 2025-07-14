import React from 'react';
import ContentSearchBar from '../components/ContentSearchBar.tsx';
import ContentCard from '../components/ContentCard.tsx';
import styled from 'styled-components';
import { dummyContents } from '../type/contents.ts';

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
`;

const MainPage: React.FC = () => {
  return (
    <div>
      <ContentSearchBar onSearch={function(): void {
              throw new Error('Function not implemented.');
          } } />
      <CardGrid>
        {dummyContents.map((item, idx) => (
          <ContentCard key={idx} {...item} />
        ))}
      </CardGrid>
    </div>
  );
};

export default MainPage;
