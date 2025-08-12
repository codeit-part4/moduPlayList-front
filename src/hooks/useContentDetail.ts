import { useEffect, useState } from 'react';
import { fetchContentDetail } from '../api/api.ts'; // 상세 정보를 불러오는 API 함수
import type { Content } from '../type/contents.ts';

interface UseContentDetailResult {
  content: Content | null;
  loading: boolean;
  error: string | null;
}

export const useContentDetail = (contentId?: string): UseContentDetailResult => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contentId) {
      setLoading(false);
      setError('콘텐츠 ID가 유효하지 않습니다.');
      return;
    }

    const loadContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchContentDetail(contentId);
        setContent(data);
      } catch (e) {
        console.error('콘텐츠 상세 정보 로딩 실패:', e);
        setError(e instanceof Error ? e.message : '콘텐츠 상세 정보를 불러오는데 실패했습니다.');
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentId]);

  return { content, loading, error };
};
