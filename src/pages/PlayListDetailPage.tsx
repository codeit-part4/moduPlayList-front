import React from 'react';
import styled from 'styled-components';
import PlayListInfo from '../components/playlist/PlayListInfo.tsx';
import ContentCard from '../components/ContentCard';
import { dummyContents } from '../type/contents.ts';
import { BackButton } from '../components/common/BackButton.tsx';
import { useNavigate } from 'react-router-dom';

const Section = styled.div`
  margin-bottom: 32px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 40px;
`;

const PlayListDetailPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <BackButton onClick={handleBack}>
        목록으로 돌아가기
      </BackButton>
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
