import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const SearchBox = styled.input`
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const UserList = styled.div`
  max-height: 180px;
  overflow-y: auto;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #bbb;
  margin-right: 8px;
`;

const UserName = styled.div`
  font-size: 14px;
`;

const dummyUsers = [
  'woody', 'woody', 'woody', 'woody', 'woody', 'woody', 'woody', 'woody'
];

const ParticipantList: React.FC = () => (
  <Container>
    <Title>000명 시청 중</Title>
    <SearchBox placeholder="사용자 검색" />
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