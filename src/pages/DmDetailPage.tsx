import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DmChatRoom from '../components/DmChatRoom';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../api/api.ts';


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
  const location = useLocation();
  const otherUserId = location.state?.otherUserId;
  const [otherUserName, setOtherUserName] = useState<string>('로딩 중...');

  // 상대방 정보 가져오기
  useEffect(() => {
    if (!otherUserId) return;

    const fetchOtherUserInfo = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/${otherUserId}`);
        if (res.ok) {
          const userData = await res.json();
          setOtherUserName(userData.nickname || userData.name || otherUserId);
        } else {
          setOtherUserName('알 수 없음');
        }
      } catch (e) {
        setOtherUserName('알 수 없음');
      }
    };

    fetchOtherUserInfo();
  }, [otherUserId]);

  return (
    <Wrapper>
      <Header>
        <BackArrow onClick={() => navigate(-1)} title="뒤로가기">←</BackArrow>
        {otherUserName}
      </Header>
      <DmChatRoom roomId={roomId} otherUserName={otherUserName} otherUserId={otherUserId} />
    </Wrapper>
  );
};

export default DmDetailPage;
