import React from 'react';
import styled from 'styled-components';

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #bbb;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

const Follow = styled.div`
  font-size: 15px;
  margin-bottom: 4px;
`;

const BtnGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Btn = styled.button`
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
`;

const Status = styled.div`
  font-size: 15px;
  margin-top: 8px;
`;

const UserProfileInfo: React.FC = () => (
  <ProfileBox>
    <Avatar />
    <Info>
      <Name>woody</Name>
      <Follow>팔로워 000  팔로잉 000</Follow>
      <BtnGroup>
        <Btn>팔로우</Btn>
        <Btn style={{ background: '#e5e7eb', color: '#222' }}>메시지 보내기</Btn>
      </BtnGroup>
      <Status>지금 <b>인셉션</b>을 보고 있습니다.</Status>
    </Info>
  </ProfileBox>
);

export default UserProfileInfo; 