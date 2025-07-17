import React from 'react';
import styled from 'styled-components';
import DmChatRoom from '../components/DmChatRoom';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: #ededed;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 32px;
  font-size: 24px;
  font-weight: bold;
`;

const BackArrow = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  margin-right: 18px;
`;

const DmDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  // 실제로는 상대 닉네임을 roomId로부터 fetch해야 하지만, 예시로 woody 고정
  const otherUserName = "woody";
  const location = useLocation();
  const participantIds = location.state?.participantIds || [];

  return (
    <Wrapper>
      <Header>
        <BackArrow onClick={() => navigate(-1)} title="뒤로가기">←</BackArrow>
        {otherUserName}
      </Header>
      <DmChatRoom roomId={roomId} otherUserName={otherUserName} participantIds={participantIds}/>
    </Wrapper>
  );
};

export default DmDetailPage; 