import React from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  margin-bottom: 24px;
`;

const ChatTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const ChatBox = styled.div`
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 8px;
  height: 180px;
  overflow-y: auto;
  padding: 12px;
  margin-bottom: 8px;
`;

const ChatMessage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #bbb;
  margin-right: 8px;
`;

const MessageText = styled.div`
  font-size: 14px;
`;

const InputBox = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const dummyMessages = [
  '건제가 좋아해요.',
  '건제가 응원해요.',
  '건제가 좋아해요.',
  '건제가 응원해요.',
  '건제가 좋아해요.',
  '건제가 응원해요.',
  '건제가 좋아해요.',
  '건제가 응원해요.',
];

const LiveChat: React.FC = () => (
  <ChatContainer>
    <ChatTitle>실시간 채팅</ChatTitle>
    <ChatBox>
      {dummyMessages.map((msg, idx) => (
        <ChatMessage key={idx}>
          <Avatar />
          <MessageText>{msg}</MessageText>
        </ChatMessage>
      ))}
    </ChatBox>
    <InputBox placeholder="메시지를 입력해주세요." />
  </ChatContainer>
);

export default LiveChat; 