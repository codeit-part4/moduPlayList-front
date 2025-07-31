import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentSearchBar from '../components/ContentSearchBar.tsx';
import ContentCard from '../components/ContentCard.tsx';
import { API_BASE_URL } from '../api.ts';

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

const Message = styled.div`
  font-size: 17px;
  color: #666;
  text-align: center;
  margin-top: 40px;
`;

const HomePage: React.FC = () => {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchContents = async (cursor?: string, query?: string) => {
    try {
      const url = new URL(`${API_BASE_URL}/api/contents`);
      if (cursor) url.searchParams.append('cursor', cursor);
      if (query) url.searchParams.append('title', query); // or 'query' if you renamed it in the backend

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('컨텐츠 불러오기 실패');

      const data = await response.json();
      setContents(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        const newItems = (data.data || []).filter(c => !existingIds.has(c.id));
        return [...prev, ...newItems];
      });
      setNextCursor(data.nextCursor || null);
      setHasNext(data.hasNext);
    } catch (err) {
      console.error('콘텐츠 불러오기 실패:', err);
      setError('콘텐츠를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents(undefined, searchQuery);
  }, [searchQuery]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 100 && hasNext && !loading) {
      setLoading(true);
      fetchContents(nextCursor || undefined, searchQuery);
    }
  };

  const handleSearch = (query: string) => {
    setContents([]);
    setNextCursor(null);
    setHasNext(true);
    setSearchQuery(query);
  };

  return (
    <div>
      <ContentSearchBar onSearch={handleSearch} />
      <CardGridWrapper onScroll={handleScroll}>
        {contents.length === 0 && !loading && !error && (
          <Message>콘텐츠가 없습니다</Message>
        )}
        <CardGrid>
          {contents.map(content => (
            <ContentCard
              key={content.id}
              id={content.id}
              image={content.posterUrl}
              category={content.category}
              title={content.title}
              description={content.summary}
              rating={content.averageRating ?? 0}
              totalRatingCount={content.totalRatingCount ?? 0}
              viewers={content.viewers ?? 0}
              disableClick={false}
            />
          ))}
        </CardGrid>
        {loading && <Message>로딩 중...</Message>}
        {error && <Message>{error}</Message>}
      </CardGridWrapper>
    </div>
  );
};


export default HomePage;
