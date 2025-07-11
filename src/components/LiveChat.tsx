import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { InputBox } from './common/InputBox.tsx'
import { Avatar } from './common/Avatar.tsx'

const ChatContainer = styled.div`
  margin-bottom: 24px;
`;

const ChatTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const ChatBox = styled.div`
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
    background-color: var(--chat-message-bg);
    margin: 6px 0;
    gap: 8px;
    padding: 5px 12px;
    border-radius: 12px;
`;

const MessageText = styled.div`
  font-size: 14px;
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

const LiveChat: React.FC = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, []);

  return (
    <ChatContainer>
      <ChatTitle>실시간 채팅</ChatTitle>
      <ChatBox ref={chatBoxRef}>
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
};

export default LiveChat;
