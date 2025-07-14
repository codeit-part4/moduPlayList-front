import React from 'react';
import styled from 'styled-components';
import ContentSearchBar from '../components/ContentSearchBar.tsx';
import ContentCard from '../components/ContentCard.tsx';
import { dummyContents } from '../data/contents.ts';

const CardGridWrapper = styled.div`
    height: 70vh;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE, Edge */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 40px;
`;

const HomePage: React.FC = () => {
  return (
    <div>
      <ContentSearchBar onSearch={function(): void {
        throw new Error('Function not implemented.');
      }} />
      <CardGridWrapper>
        <CardGrid>
          {dummyContents.map((item) => (
            <ContentCard {...item} disableClick={false} />
          ))}
        </CardGrid>
      </CardGridWrapper>
    </div>
  );
};

export default HomePage;
