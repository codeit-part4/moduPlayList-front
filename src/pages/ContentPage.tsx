import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentDetailInfo from '../components/ContentDetailInfo';
import LiveChat from '../components/LiveChat';
import ParticipantList from '../components/ParticipantList';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../components/common/BackButton';
import { fetchContentDetail } from '../api';
import type { Content } from '../type/contents.ts';

const DetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ChatSection = styled.div`
  display: flex;
  gap: 32px;
`;

const LeftSection = styled.div`
  flex: 2;
`;

const RightSection = styled.div`
  flex: 1.2;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ContentPage: React.FC = () => {
  const navigate = useNavigate();
  const { contentId } = useParams<{ contentId: string }>();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      if (!contentId) {
        setError('콘텐츠 ID가 유효하지 않습니다.');
        return;
      }

      setLoading(true);
      try {
        const data = await fetchContentDetail(contentId);
        setContent(data);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : '콘텐츠를 불러오는데 실패했습니다.');
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentId]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <DetailLayout>
        <BackButton onClick={handleBack}>목록으로 돌아가기</BackButton>
        <LoadingMessage>콘텐츠를 불러오는 중...</LoadingMessage>
      </DetailLayout>
    );
  }

  if (error || !content) {
    return (
      <DetailLayout>
        <BackButton onClick={handleBack}>목록으로 돌아가기</BackButton>
        <ErrorMessage>{error || '콘텐츠를 찾을 수 없습니다.'}</ErrorMessage>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout>
      <BackButton onClick={handleBack}>
        목록으로 돌아가기
      </BackButton>
      <ContentDetailInfo content={content} />
      <ChatSection>
        <LeftSection>
          <LiveChat />
        </LeftSection>
        <RightSection>
          <ParticipantList />
        </RightSection>
      </ChatSection>
    </DetailLayout>
  );
};

export default ContentPage;
