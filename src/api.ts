import type { PlaylistResponse } from './type/playlists.ts';
import type { Content, ContentResponse } from './type/contents.ts';

export const
  API_BASE_URL = 'http://localhost:8080';

export const fetchPlaylists = async (): Promise<PlaylistResponse[]> => {
  try {
    const response = await fetch(API_BASE_URL + '/api/playlists/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlists');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
};

export const fetchPlaylistById = async (playlistId: string): Promise<PlaylistResponse> => {
  try {
    const response = await fetch(API_BASE_URL + `/api/playlists/${playlistId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlist');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
};

export const fetchPlaylistContents = async (playlistId: string) => {
  try {
    const response = await fetch(API_BASE_URL + `/api/playlists/${playlistId}/contents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch playlist contents');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching playlist contents:', error);
    throw error;
  }
};

export const fetchContents = async ({
  title = '',
  nextCursor = '',
  size = 20,
}: {
  title?: string;
  nextCursor?: string | null;
  size?: number;
} = {}): Promise<ContentResponse> => {
  try {
    const params = new URLSearchParams();
    if (title) params.append('title', title);
    if (nextCursor) params.append('cursor', nextCursor); // nextCursor가 있을 때만 'cursor' 파라미터 추가
    params.append('size', size.toString());

    const response = await fetch(`${API_BASE_URL}/api/contents?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('콘텐츠를 불러오는데 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('콘텐츠 조회 중 오류 발생:', error);
    throw error;
  }
};

export const fetchContentDetail = async (contentId: string): Promise<Content> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contents/${contentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('콘텐츠를 불러오는데 실패했습니다.');
    }

    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new Error('잘못된 응답 형식입니다.');
    }

    return data;
  } catch (error) {
    console.error('콘텐츠 상세 조회 중 오류 발생:', error);
    throw error;
  }
};
