import React from 'react';
import styled from 'styled-components';
import ContentSearchBar from '../components/ContentSearchBar.tsx';
import ContentCard from '../components/ContentCard.tsx';

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

const dummyContents = [
  { id: '1', category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { id: '2', category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 3.0, viewers: 0, image: '' },
  { id: '3', category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 1.0, viewers: 0, image: '' },
  { id: '4', category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { id: '5', category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { id: '6', category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { id: '7', category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { id: '8', category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
];

const HomePage: React.FC = () => {
  return (
    <div>
      <ContentSearchBar onSearch={function(): void {
        throw new Error('Function not implemented.');
      }} />
      <CardGridWrapper>
        <CardGrid>
          {dummyContents.map((item, idx) => (
            <ContentCard key={idx} {...item} />
          ))}
        </CardGrid>
      </CardGridWrapper>
    </div>
  );
};

export default HomePage;
