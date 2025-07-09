import React from 'react';
import ContentSearchBar from '../components/content/ContentSearchBar.tsx';
import ContentCard from '../components/content/ContentCard.tsx';
import styled from 'styled-components';

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
`;

const dummyContents = [
  { category: '카테고리', title: '콘텐츠 제목', description: '콘텐츠 설명', rating: 4.7, viewers: 123, image: '' },
  { category: '카테고리', title: '콘텐츠 제목', description: '콘텐츠 설명', rating: 4.7, viewers: 123, image: '' },
  { category: '카테고리', title: '콘텐츠 제목', description: '콘텐츠 설명', rating: 4.7, viewers: 123, image: '' },
  { category: '카테고리', title: '콘텐츠 제목', description: '콘텐츠 설명', rating: 4.7, viewers: 123, image: '' },
  { category: '카테고리', title: '콘텐츠 제목', description: '콘텐츠 설명', rating: 4.7, viewers: 123, image: '' },
  { category: '카테고리', title: '콘텐츠 제목', description: '콘텐츠 설명', rating: 4.7, viewers: 123, image: '' },
  { category: '카테고리', title: '콘텐츠 제목', description: '콘텐츠 설명', rating: 4.7, viewers: 123, image: '' },
  { category: '카테고리', title: '콘텐츠 제목', description: '콘텐츠 설명', rating: 4.7, viewers: 123, image: '' },
];

const MainPage: React.FC = () => {
  return (
    <div>
      <ContentSearchBar />
      <CardGrid>
        {dummyContents.map((item, idx) => (
          <ContentCard key={idx} {...item} />
        ))}
      </CardGrid>
    </div>
  );
};

export default MainPage;
