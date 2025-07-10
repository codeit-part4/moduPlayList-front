import React from 'react';
import styled from 'styled-components';
import { InputBox } from './common/InputBox.tsx'
import { Avatar } from './common/Avatar.tsx'

const Container = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const UserList = styled.div`
  margin-top: 10px;
  max-height: 180px;
  overflow-y: auto;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0;
  gap: 8px;
  background-color: var(--chat-message-bg);
  border-radius: 12px;
  padding: 5px 12px;
`;

const UserName = styled.div`
  font-size: 14px;
`;

const dummyUsers = [
  'woody', 'woody', 'woody', 'woody', 'woody', 'woody', 'woody', 'woody'
];

const ParticipantList: React.FC = () => (
  <Container>
    <Title>{dummyUsers.length}명 시청 중</Title>
    <InputBox placeholder="사용자 검색" />
    <UserList>
      {dummyUsers.map((name, idx) => (
        <UserItem key={idx}>
          <Avatar />
          <UserName>{name}</UserName>
        </UserItem>
      ))}
    </UserList>
  </Container>
);

export default ParticipantList;
