import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import ContentSearchBar from '../components/ContentSearchBar';
import ContentCard from '../components/ContentCard';
import type { Content } from '../type/contents';
import { fetchContents } from '../api';

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

const LoadingSpinner = styled.div`
    text-align: center;
    padding: 1rem;
    color: #666;
`;

const ContentListPage: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null); // 페이지 번호 대신 nextCursor 상태 사용
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const observer = useRef<IntersectionObserver | null>(null);

  const lastContentElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || !hasMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchAndSetContents(nextCursor, searchQuery);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, nextCursor, searchQuery]);

  // 데이터를 가져오는 함수 (커서 기반으로 수정)
  const fetchAndSetContents = async (cursor: string | null, title: string, isNewSearch = false) => {
    if (loading) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetchContents({
        title,
        size: 20,
        nextCursor: cursor
      });

      if (!response || !response.data) {
        throw new Error('데이터가 올바르지 않습니다.');
      }

      const newContents = response.data;
      const newNextCursor = response.nextCursor;
      const newHasMore = response.hasNext;

      if (isNewSearch) {
        setContents(newContents);
      } else {
        setContents(prev => [...prev, ...newContents]);
      }

      setNextCursor(newNextCursor); // 다음 요청에 사용할 커서 업데이트
      setHasMore(newHasMore); // 더 불러올 데이터가 있는지 업데이트

    } catch (e) {
      console.error('콘텐츠 로딩 실패:', e);
      setError(e instanceof Error ? e.message : '콘텐츠를 불러오는데 실패했습니다.');
    }
    setLoading(false);
  };

  // `nextCursor` 또는 `searchQuery`가 변경될 때마다 데이터를 가져옵니다.
  useEffect(() => {
    // 첫 로딩 시 또는 검색어 변경 시에만 fetch
    if (nextCursor === null) {
      fetchAndSetContents(null, searchQuery, true);
    }
  }, [searchQuery]);

  // 검색 처리 (nextCursor를 리셋)
  const handleSearch = (title: string) => {
    setSearchQuery(title);
    setContents([]);
    setNextCursor(null); // 검색 시 커서와 콘텐츠를 리셋
    setHasMore(true);
  };

  const renderContent = () => {
    if (error) {
      return <EmptyMessage>{error}</EmptyMessage>;
    }

    if (loading && contents.length === 0) {
      return <EmptyMessage>로딩 중...</EmptyMessage>;
    }

    if (contents.length === 0) {
      return <EmptyMessage>콘텐츠가 없습니다.</EmptyMessage>;
    }

    return (
      <>
        <CardGrid>
          {contents.map((item: Content, index) => (
            <div
              ref={index === contents.length - 1 ? lastContentElementRef : null}
              key={item.id}
            >
              <ContentCard {...item} disableClick={false} />
            </div>
          ))}
        </CardGrid>
        {loading && <LoadingSpinner>로딩 중...</LoadingSpinner>}
      </>
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
