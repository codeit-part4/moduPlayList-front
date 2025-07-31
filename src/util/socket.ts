import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const createStompClient = (onConnected: (client: Client) => void): Client => {
  const socket = new SockJS(
    window.location.protocol === 'https:'
      ? 'https://mople-team02.p-e.kr/ws'
      : 'http://localhost:8080/ws'
  );

  const token = localStorage.getItem('accessToken');

  const client = new Client({
    webSocketFactory: () => socket,
    connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    debug: (str) => console.log('[WebSocket]', str),
    onConnect: () => onConnected(client),
  });

  return client;
};