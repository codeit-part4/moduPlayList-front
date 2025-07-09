import React from 'react';
import styled from 'styled-components';
import ContentSearchBar from '../components/content/ContentSearchBar.tsx';
import ContentCard from '../components/content/ContentCard.tsx';

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
  { category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 3.0, viewers: 0, image: '' },
  { category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 1.0, viewers: 0, image: '' },
  { category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
];

const HomePage: React.FC = () => {
  return (
    <div>
      <ContentSearchBar />
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
