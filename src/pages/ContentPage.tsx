import React from 'react';
import styled from 'styled-components';
import ContentDetailInfo from '../components/ContentDetailInfo';
import LiveChat from '../components/LiveChat';
import ParticipantList from '../components/ParticipantList';

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
  return (
    <DetailLayout>
      <ContentDetailInfo />
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