import { API_BASE_URL } from './api.ts';
import type { Participant } from '../type/participant.ts';

// 세션 생성 또는 조회
export const fetchOrCreateSession = async (contentId: string): Promise<{ id: string }> => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("로그인 토큰이 없습니다.");

  const response = await fetch(`${API_BASE_URL}/api/watch-sessions/content/${contentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    // throw new Error("세션 불러오기 실패");
  }
  return response.json();
};

// 세션 참여
export const joinSession = async (sessionId: string) => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("로그인 토큰이 없습니다.");

  await fetch(`${API_BASE_URL}/api/watch-sessions/${sessionId}/join`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// 세션 나가기
export const leaveSession = async (sessionId: string) => {
  const token = localStorage.getItem("accessToken");
  if (!token) return;

  await fetch(`${API_BASE_URL}/api/watch-sessions/${sessionId}/leave`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// 참여자 목록 조회
export const fetchParticipants = async (sessionId: string): Promise<Participant[]> => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.warn("No access token found");
    return [];
  }

  const response = await fetch(`${API_BASE_URL}/api/watch-sessions/${sessionId}/participants`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("참여자 불러오기 실패");
  }
  return response.json();
};
