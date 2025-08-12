import { API_BASE_URL } from './api.ts';

export const fetchLikeCount = async (id: string): Promise<number> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contents/${id}/likes`);
    if (!res.ok) {
      throw new Error('Failed to fetch like count.');
    }
    const data = await res.json();
    return data.count;
  } catch (error) {
    console.error('좋아요 수를 가져오는데 실패했습니다:', error);
    return 0;
  }
};

export const checkMyLikeStatus = async (id: string): Promise<boolean> => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return false;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/api/contents/${id}/likes/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      return false;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('좋아요 상태 확인에 실패했습니다:', error);
    return false;
  }
};

export const addLike = async (id: string): Promise<boolean> => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    alert('로그인이 필요합니다.');
    return false;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/api/contents/${id}/likes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return res.ok;
  } catch (error) {
    console.error('좋아요 추가에 실패했습니다:', error);
    alert('서버와 연결할 수 없습니다.');
    return false;
  }
};

export const removeLike = async (id: string): Promise<boolean> => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    alert('로그인이 필요합니다.');
    return false;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/api/contents/${id}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return res.ok;
  } catch (error) {
    console.error('좋아요 취소에 실패했습니다:', error);
    alert('서버와 연결할 수 없습니다.');
    return false;
  }
};
