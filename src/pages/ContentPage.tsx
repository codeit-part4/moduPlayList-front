import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ContentDetailInfo from '../components/ContentDetailInfo';
import LiveChat from '../components/LiveChat';
import ParticipantList from '../components/ParticipantList';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../components/common/BackButton.tsx';
import { API_BASE_URL } from '../api.ts';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const DetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ChatSection = styled.div`
  display: flex;
  gap: 32px;
`;

const LeftSection = styled.div`
  flex: 2;
`;

const RightSection = styled.div`
  flex: 1.2;
`;

const Message = styled.div`
  font-size: 17px;
  color: #666;
  text-align: center;
  margin-top: 40px;
`;

const ContentPage: React.FC = () => {
  const { contentId } = useParams<{ contentId: string }>();
  const navigate = useNavigate();

  const [content, setContent] = useState<any | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasFetchedContent = useRef(false);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contents/${contentId}`);
      if (!response.ok) throw new Error("콘텐츠 불러오기 실패");
      const data = await response.json();
      setContent(data);
    } catch (err) {
      console.error(err);
      setError("콘텐츠를 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrCreateSession = async (contentId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/api/watch-sessions/content/${contentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("세션 불러오기 실패");

      const data = await response.json();
      setSessionId(data.id);
    } catch (err) {
      console.error("🔴 세션 생성/조회 실패:", err);
    }
  };

  const joinSession = async (sessionId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.warn("No access token found in localStorage");
        return;
      }

      await fetch(`${API_BASE_URL}/api/watch-sessions/${sessionId}/join`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("🔴 세션 참여 실패:", err);
    }
  };

  const leaveSession = async (sessionId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      await fetch(`${API_BASE_URL}/api/watch-sessions/${sessionId}/leave`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("🔴 세션 나가기 실패:", err);
    }
  };

  const fetchParticipants = async (sessionId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.warn("No access token found");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/watch-sessions/${sessionId}/participants`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("참여자 불러오기 실패");

      const data = await response.json();
      setParticipants(data);
    } catch (err) {
      console.error("🔴 참여자 목록 로드 실패:", err);
    }
  };

  useEffect(() => {
    if (!contentId || hasFetchedContent.current) return;
    hasFetchedContent.current = true;
    fetchContent();
  }, [contentId]);

  useEffect(() => {
    if (!content?.id) return;
    fetchOrCreateSession(content.id);
  }, [content?.id]);

  useEffect(() => {
    if (!sessionId) return;

    const socket = new SockJS(`${API_BASE_URL}/ws`);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log("✅ WebSocket connected");

      stompClient.subscribe(`/sub/watch-session/${sessionId}/participants`, message => {
        const payload = JSON.parse(message.body);
        console.log("📡 Received participant event:", payload);

        setParticipants(prev => {
          const alreadyJoined = prev.some(
            p =>
              p.participantId === payload.participant.participantId ||
              p.userId === payload.participant.userId
          );

          if (payload.type === 'JOIN') {
            return alreadyJoined ? prev : [...prev, payload.participant];
          }
          if (payload.type === 'LEAVE') {
            return prev.filter(p => p.participantId !== payload.participant.participantId);
          }
          return prev;
        });
      });

      joinSession(sessionId);
      fetchParticipants(sessionId);
    });

    return () => {
      stompClient.disconnect(() => {
        console.log("🛑 WebSocket disconnected");
      });
      leaveSession(sessionId);
    };
  }, [sessionId]);

  const handleBack = () => navigate(-1);

  if (loading) return <Message>불러오는 중...</Message>;
  if (error) return <Message>{error}</Message>;
  if (!content) return <Message>콘텐츠를 찾을 수 없습니다.</Message>;

  return (
    <DetailLayout>
      <BackButton onClick={handleBack}>목록으로 돌아가기</BackButton>
      <ContentDetailInfo content={content} />
      <ChatSection>
        <LeftSection>
          {sessionId ? <LiveChat sessionId={sessionId} /> : <Message>세션 준비 중...</Message>}
        </LeftSection>
        <RightSection>
          <ParticipantList participants={participants} />
        </RightSection>
      </ChatSection>
    </DetailLayout>
  );
};



export default ContentPage;
