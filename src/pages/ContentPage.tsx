import React from 'react';
import styled from 'styled-components';
import ContentDetailInfo from '../components/ContentDetailInfo';
import LiveChat from '../components/LiveChat';
import ParticipantList from '../components/ParticipantList';
import { useNavigate } from 'react-router-dom';

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

const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    margin-bottom: 20px;
    background: transparent;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    transition: all 0.2s ease;

    &::before {
        content: "←";
        font-size: 16px;
    }
`;

const ContentPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <DetailLayout>
      <BackButton onClick={handleBack}>
        목록으로 돌아가기
      </BackButton>
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
