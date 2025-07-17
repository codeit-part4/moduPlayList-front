import React, { useEffect, useRef, useState } from 'react'
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

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SendButton = styled.button`
  background: #6e56cf;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #866bff;
  }
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

interface LiveChatProps {
  roomId?: string;
}

const LiveChat: React.FC<LiveChatProps> = ({ roomId }) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(dummyMessages);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput('');
  };

  return (
    <ChatContainer>
      <ChatTitle>실시간 채팅 {roomId && <span style={{fontSize:'13px', color:'#888'}}>#{roomId}</span>}</ChatTitle>
      <ChatBox ref={chatBoxRef}>
        {messages.map((msg, idx) => (
          <ChatMessage key={idx}>
            <Avatar />
            <MessageText>{msg}</MessageText>
          </ChatMessage>
        ))}
      </ChatBox>
      <InputRow>
        <InputBox 
          placeholder="메시지를 입력해주세요."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <SendButton onClick={handleSend} title="메시지 전송">
          ↑
        </SendButton>
      </InputRow>
    </ChatContainer>
  );
};

export default LiveChat;
