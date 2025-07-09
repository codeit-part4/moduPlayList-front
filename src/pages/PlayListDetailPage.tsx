import React from 'react';
import styled from 'styled-components';
import PlayListInfo from '../components/PlayListInfo';
import ContentCard from '../components/ContentCard';

const Section = styled.div`
  margin-bottom: 32px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 40px;
`;

const dummyContents = [
  { category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
  { category: '(카테고리)', title: '{콘텐츠 제목}', description: '(콘텐츠 설명)', rating: 4.7, viewers: 0, image: '' },
];

const PlayListDetailPage: React.FC = () => {
  return (
    <div>
      <Section>
        <PlayListInfo />
      </Section>
      <Section>
        <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px'}}>콘텐츠 목록</div>
        <CardGrid>
          {dummyContents.map((item, idx) => (
            <ContentCard key={idx} {...item} />
          ))}
        </CardGrid>
      </Section>
    </div>
  );
};

export default PlayListDetailPage; 