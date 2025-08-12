import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { InputBox } from './common/InputBox.tsx'
import { Avatar } from './common/Avatar.tsx'
import { Client } from '@stomp/stompjs';
import { API_BASE_URL } from '../api/api.ts';
import SockJS from 'sockjs-client';

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
  sessionId?: string;
}

interface WatchCommentResponse {
  userId: string;
  sessionId: string;
  message: string;
  sentAt?: string;
}

const LiveChat: React.FC<LiveChatProps> = ({ sessionId }) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const stompClientRef = useRef<Client | null>(null);

  const [input, setInput] = useState('');
  const [senderId, setSenderId] = useState('');
  const [messages, setMessages] = useState<WatchCommentResponse[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => res.ok ? res.json() : Promise.reject())
    .then(data => setSenderId(data.userid))
    .catch(() => {});
  }, []);

  useEffect(() => {
    const socket = new SockJS(
      window.location.protocol === 'https:' ? 'https://mople-team02.p-e.kr/ws' : 'http://localhost:8080/ws'
    );
    const token = localStorage.getItem('accessToken');

    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
      debug: (str) => console.log('[WebSocket]', str),
      onConnect: () => {
        client.subscribe(`/sub/watch-session/${sessionId}`, (message) => {
          const msg = JSON.parse(message.body) as WatchCommentResponse;
          setMessages(prev => [...prev, msg]);
        });
      }
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [sessionId]);

  useEffect(() => {
    chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !senderId || !sessionId || !stompClientRef.current?.connected) return;

    stompClientRef.current.publish({
      destination: `/pub/watch-session/${sessionId}/comments`,
      body: JSON.stringify({
        sessionId,
        senderId,
        message: input,
      }),
    });

    setInput('');
  };

  return (
    <ChatContainer>
      <ChatTitle>
        실시간 채팅
      </ChatTitle>
      <ChatBox ref={chatBoxRef}>
        {messages.map((msg, idx) => (
          <ChatMessage key={idx}>
            <Avatar />
            <MessageText>{msg.message}</MessageText>
          </ChatMessage>
        ))}
      </ChatBox>
      <InputRow>
        <InputBox
          placeholder="메시지를 입력해주세요."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyUp={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <SendButton onClick={handleSend} title="메시지 전송">↑</SendButton>
      </InputRow>
    </ChatContainer>
  );
};

export default LiveChat;
