// src/hooks/useSession.ts
import { useEffect, useState, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_BASE_URL } from '../api/api.ts';
import { fetchOrCreateSession, fetchParticipants, joinSession, leaveSession } from '../api/session.ts';
import type { Participant } from '../type/participant.ts';


interface SessionState {
  sessionId: string | null;
  participants: Participant[];
  loading: boolean;
  error: string | null;
}

export const useSession = (contentId?: string) => {
  const [sessionState, setSessionState] = useState<SessionState>({
    sessionId: null,
    participants: [],
    loading: true,
    error: null,
  });
  const stompClientRef = useRef<Stomp | null>(null);

  useEffect(() => {
    if (!contentId) {
      setSessionState(prev => ({
        ...prev,
        error: '콘텐츠 ID가 유효하지 않습니다.',
        loading: false,
      }));
      return;
    }

    const setupSession = async () => {
      setSessionState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const session = await fetchOrCreateSession(contentId);
        setSessionState(prev => ({ ...prev, sessionId: session.id, loading: false }));
      } catch (e) {
        setSessionState(prev => ({
          ...prev,
          error: e instanceof Error ? e.message : '세션 로드 실패',
          loading: false,
        }));
      }
    };

    setupSession();
  }, [contentId]);

  useEffect(() => {
    if (!sessionState.sessionId) return;

    const sessionId = sessionState.sessionId;
    const socket = new SockJS(`${API_BASE_URL}/ws`);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, () => {
      console.log("✅ WebSocket connected");

      // 참여자 목록 구독
      stompClient.subscribe(`/sub/watch-session/${sessionId}/participants`, message => {
        const payload = JSON.parse(message.body);
        console.log("📡 Received participant event:", payload);

        setSessionState(prev => {
          const alreadyJoined = prev.participants.some(
            p => p.participantId === payload.participant.participantId
          );

          if (payload.type === 'JOIN') {
            return alreadyJoined
              ? prev
              : { ...prev, participants: [...prev.participants, payload.participant] };
          }
          if (payload.type === 'LEAVE') {
            return {
              ...prev,
              participants: prev.participants.filter(
                p => p.participantId !== payload.participant.participantId
              ),
            };
          }
          return prev;
        });
      });

      // 초기 참여자 목록 가져오기 및 세션 참여
      joinSession(sessionId)
        .then(() => fetchParticipants(sessionId))
        .then(participants => {
          setSessionState(prev => ({ ...prev, participants }));
        })
        .catch(err => {
          console.error("초기 세션 참여 및 참여자 목록 로드 실패:", err);
        });
    });

    // 컴포넌트 언마운트 시 정리(cleanup)
    return () => {
      stompClient.disconnect(() => {
        console.log("🛑 WebSocket disconnected");
      });
      leaveSession(sessionId);
    };
  }, [sessionState.sessionId]);

  return sessionState;
};
