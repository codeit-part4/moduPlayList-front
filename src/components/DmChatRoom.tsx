import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { InputBox } from './common/InputBox.tsx';
import { Avatar } from './common/Avatar.tsx';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_BASE_URL } from '../api/api.ts';

const ChatRoomContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 32px 0 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageRow = styled.div<{ isMe: boolean }>`
  display: flex;
  align-items: flex-end;
  justify-content: ${props => (props.isMe ? 'flex-end' : 'flex-start')};
`;

const Bubble = styled.div<{ isMe: boolean }>`
  background: #fff;
  color: #222;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 14px 18px;
  font-size: 16px;
  max-width: 320px;
  min-width: 80px;
  margin: 0 8px;
  text-align: left;
  ${props => props.isMe && css`
    background: #e5e7eb;
    color: #222;
  `}
`;

const AvatarBox = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 8px;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-top: 1px solid #e0e0e0;
`;

const SendButton = styled.button`
  background: #6e56cf;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  margin-left: 8px;
  transition: background 0.2s;
  &:hover {
    background: #866bff;
  }
`;

interface DmChatRoomProps {
  roomId?: string;
  otherUserName: string;
  otherUserId?: string;
}

interface Message {
  id?: string;
  chatRoomId?: string;
  senderId: string;
  content: string;
  createdAt?: string;
  // revicedId는 전송에만 사용
}

const DmChatRoom: React.FC<DmChatRoomProps> = ({ roomId, otherUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [senderId, setSenderId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const stompClientRef = useRef<Client | null>(null);
  const getSocketUrl = () => {
    return window.location.protocol === 'https:'
      ? 'https://mople-team02.p-e.kr/ws'
      : 'http://localhost:8080/ws';
  };

  const socket = new SockJS(getSocketUrl());

  // 내 userId 가져오기
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setSenderId(data.userid);
        // otherUserId를 receiverId로 설정
        if (otherUserId) setReceiverId(otherUserId);
      })
      .catch(() => {});
  }, [otherUserId]);

  // 메시지 히스토리 불러오기
  useEffect(() => {
    if (!receiverId || !roomId) return;
    const token = localStorage.getItem('accessToken');
    fetch(`${API_BASE_URL}/api/dm/${receiverId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        // data.content 또는 data가 배열인지 확인
        if (Array.isArray(data.content)) {
          setMessages(data.content);
        } else if (Array.isArray(data)) {
          setMessages(data);
        }
      })
      .catch(() => {});
  }, [receiverId, roomId]);

  // STOMP WebSocket 연결 및 구독
  useEffect(() => {
    if (!roomId || !senderId || !receiverId) return;
    const token = localStorage.getItem('accessToken');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
      debug: (str) => console.log(str),
      onConnect: () => {
        client.subscribe(`/sub/dm/${roomId}`, (message) => {
          console.log('서버에서 온 메시지:', message.body);
          const msgObj = JSON.parse(message.body);
          setMessages(prev => [...prev, msgObj]);
        });
      },
    });
    client.activate();
    stompClientRef.current = client;
    return () => { client.deactivate(); };
  }, [roomId, senderId, receiverId]);

  // 메시지 전송
  const handleSend = useCallback(() => {
    console.log('send', { input, roomId, senderId, receiverId });
    if (!input.trim() || !roomId || !senderId || !receiverId) return;
    if (stompClientRef.current) {
      console.log('connected?', stompClientRef.current.connected);
    }
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: '/pub/messages',
        body: JSON.stringify({
          roomId,
          content: input,
          senderId,
          receiverId,
        }),
      });
      setInput('');
    }
  }, [input, roomId, senderId, receiverId]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatRoomContainer>
      <MessagesArea ref={chatRef}>
        {messages.map((msg, idx) => (
          <MessageRow key={msg.id || idx} isMe={msg.senderId === senderId}>
            {msg.senderId !== senderId && <AvatarBox><Avatar /></AvatarBox>}
            <Bubble isMe={msg.senderId === senderId}>{msg.content.split('\n').map((line, i) => <div key={i}>{line}</div>)}</Bubble>
            {msg.senderId === senderId && <AvatarBox />}
          </MessageRow>
        ))}
      </MessagesArea>
      <InputArea>
        <InputBox
          placeholder="메시지를 입력하세요."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyUp={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <SendButton onClick={handleSend} title="메시지 전송">↑</SendButton>
      </InputArea>
    </ChatRoomContainer>
  );
};

export default DmChatRoom;
