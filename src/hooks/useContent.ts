import { useEffect, useState } from 'react';
import { fetchContents } from '../api/api.ts';
import type { Content } from '../type/contents.ts';

interface UseContentResult {
  contents: Content[];
  loading: boolean;
  error: string | null;
}

export const useContent = (searchTitle: string = ''): UseContentResult => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContents = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    loadContents();
  }, [searchTitle]);

  return { contents, loading, error };
};
