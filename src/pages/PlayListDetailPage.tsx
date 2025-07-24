import React from 'react';
import styled from 'styled-components';
import PlayListInfo from '../components/playlist/PlayListInfo.tsx';
import ContentCard from '../components/ContentCard';
import { dummyContents } from '../type/contents.ts';
import { BackButton } from '../components/common/BackButton.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';

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
  const { playListId } = useParams<{ playListId: string }>();

  const [playlist, setPlaylist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!playListId) return;
    const fetchPlaylist = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/playlists/${playListId}`);
        if (!res.ok) throw new Error('플레이리스트 정보를 불러오지 못했습니다');
        const data = await res.json();
        // user.userName을 user.nickname으로 변환
        const mapped = {
          ...data,
          user: {
            ...data.user,
            nickname: data.user.userName,
          },
        };
        setPlaylist(mapped);
      } catch (err: any) {
        setError(err.message || '에러가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [playListId]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <BackButton onClick={handleBack}>
        목록으로 돌아가기
      </BackButton>
      <Section>
        {loading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <PlayListInfo playlist={playlist} />
        )}
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
