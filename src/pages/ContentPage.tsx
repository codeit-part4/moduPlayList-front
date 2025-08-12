import React from 'react';
import styled from 'styled-components';
import ContentDetailInfo from '../components/ContentDetailInfo';
import LiveChat from '../components/LiveChat';
import ParticipantList from '../components/ParticipantList';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../components/common/BackButton';
import { useSession } from '../hooks/useSession.ts';
import { useContentDetail } from '../hooks/useContentDetail.ts';

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

const Message = styled.div`
    font-size: 17px;
    color: #666;
    text-align: center;
    margin-top: 40px;
`;

const ContentPage: React.FC = () => {
  const navigate = useNavigate();
  const { contentId } = useParams<{ contentId: string }>();

  // 콘텐츠 정보를 불러오는 로직을 커스텀 훅으로 분리
  const { content, loading: contentLoading, error: contentError } = useContentDetail(contentId);
  // 세션 관련 로직을 커스텀 훅으로 분리
  const { sessionId, participants, loading: sessionLoading, error: sessionError } = useSession(contentId);

  const handleBack = () => navigate(-1);

  if (contentLoading || sessionLoading) {
    return (
      <DetailLayout>
        <BackButton onClick={handleBack}>목록으로 돌아가기</BackButton>
        <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>
      </DetailLayout>
    );
  }

  if (contentError || sessionError || !content) {
    return (
      <DetailLayout>
        <BackButton onClick={handleBack}>목록으로 돌아가기</BackButton>
        <ErrorMessage>{contentError || sessionError || '콘텐츠를 찾을 수 없습니다.'}</ErrorMessage>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout>
      <BackButton onClick={handleBack}>목록으로 돌아가기</BackButton>
      <ContentDetailInfo content={content} />
      <ChatSection>
        <LeftSection>
          {sessionId ? <LiveChat sessionId={sessionId} /> : <Message>세션 준비 중...</Message>}
        </LeftSection>
        <RightSection>
          <ParticipantList participants={participants} />
        </RightSection>
      </ChatSection>
    </DetailLayout>
  );
};

export default ContentPage;
