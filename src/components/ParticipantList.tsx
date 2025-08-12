import React, { useState } from 'react';
import styled from 'styled-components';
import { InputBox } from './common/InputBox.tsx'
import { Avatar } from './common/Avatar.tsx'

interface Participant {
  participantId: string;
  userId: string;
  userName: string;
  joinedAt: string;
}

interface ParticipantListProps {
  participants: Participant[];
}

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
  background-color: var(--chat-message-bg, #f5f5f5);
  border-radius: 12px;
  padding: 5px 12px;
`;

const UserName = styled.div`
  font-size: 14px;
`;

const ParticipantList: React.FC<ParticipantListProps> = ({ participants }) => {
  const [search, setSearch] = useState('');

  const filtered = participants.filter(p =>
    p.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Title>{participants.length}명 시청 중</Title>
      <InputBox
        placeholder="사용자 검색"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <UserList>
        {filtered.map(p => (
          <UserItem key={p.participantId}>
            <Avatar />
            <UserName>{p.userName}</UserName>
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
};


export default ParticipantList;
