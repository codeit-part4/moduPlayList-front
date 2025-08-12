import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentSearchBar from '../components/ContentSearchBar';
import ContentCard from '../components/ContentCard';
import type { Content } from '../type/contents';
import { fetchContents } from '../api';

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
    gap: 10px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ContentListPage: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadContents = async (searchTitle = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchContents({ title: searchTitle, size: 30 });
      if (!response || !response.data) {
        throw new Error('데이터가 올바르지 않습니다.');
      }
      setContents(response.data);
    } catch (e) {
      console.error('콘텐츠 로딩 실패:', e);
      setContents([]);
      setError(e instanceof Error ? e.message : '콘텐츠를 불러오는데 실패했습니다.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadContents();
  }, []);

  const handleSearch = (title: string) => {
    loadContents(title);
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
