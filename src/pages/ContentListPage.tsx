import React, { useState } from 'react';
import styled from 'styled-components';
import ContentSearchBar from '../components/ContentSearchBar';
import ContentCard from '../components/ContentCard';
import type { Content } from '../type/contents';
import { useContent } from '../hooks/useContent'; // 새로 만든 훅 import

const CardGridWrapper = styled.div`
    height: 70vh;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 10px;
`;

const EmptyMessage = styled.div`
    text-align: center;
    padding: 2rem;
    color: #666;
`;

const ContentListPage: React.FC = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const { contents, loading, error } = useContent(searchTitle); // 커스텀 훅 사용

  const handleSearch = (title: string) => {
    setSearchTitle(title);
  };

  const renderContent = () => {
    if (loading) {
      return <EmptyMessage>로딩 중...</EmptyMessage>;
    }

    if (error) {
      return <EmptyMessage>{error}</EmptyMessage>;
    }

    if (!contents || contents.length === 0) {
      return <EmptyMessage>콘텐츠가 없습니다.</EmptyMessage>;
    }

    return (
      <CardGrid>
        {contents.map((item: Content) => (
          <ContentCard key={item.id} {...item} disableClick={false} />
        ))}
      </CardGrid>
    );
  };

  return (
    <div>
      <ContentSearchBar onSearch={handleSearch} />
      <CardGridWrapper>
        {renderContent()}
      </CardGridWrapper>
    </div>
  );
};

export default ContentListPage;
