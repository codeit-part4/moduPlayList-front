import type { PlaylistResponse } from './type/playlists.ts';

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

