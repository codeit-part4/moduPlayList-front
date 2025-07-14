import React from 'react';
import styled from 'styled-components';
import ContentDetailInfo from '../components/ContentDetailInfo';
import LiveChat from '../components/LiveChat';
import ParticipantList from '../components/ParticipantList';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyContents } from '../type/contents.ts';
import { BackButton } from '../components/common/BackButton.tsx';

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

const ContentPage: React.FC = () => {
  const navigate = useNavigate();
  const { contentId } = useParams<{ contentId: string }>();

  const content = dummyContents.find(content => content.id === contentId);

  if (!content) {
    return <div>콘텐츠를 찾을 수 없습니다.</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

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
