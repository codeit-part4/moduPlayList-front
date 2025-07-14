import type { UserListResponse } from './user.ts';

export interface PlaylistResponse {
  id: string;
  user: UserListResponse;
  title: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  subscribeCount: number;
}

// 예시 데이터
export const samplePlaylistResponses: PlaylistResponse[] = [
  {
    id: "8c36d5ca-06c6-4e93-9f4c-4c5f4919d83d",
    user: {
      id: "user-uuid-1",
      nickname: "영화매니아",
      profileImage: "https://example.com/profiles/user1.jpg"
    },
    title: "내가 사랑한 영화들",
    description: "감성적인 영화들을 모아봤어요.",
    isPublic: true,
    createdAt: "2024-06-01T13:00:00+09:00",
    updatedAt: "2024-06-20T18:45:00+09:00",
    subscribeCount: 23
  },
  {
    id: "7a25c4b9-15d7-4e82-8e3b-3c9d8f2a1b5c",
    user: {
      id: "user-uuid-2",
      nickname: "시리즈홀릭",
      profileImage: "https://example.com/profiles/user2.jpg"
    },
    title: "넷플릭스 추천 시리즈",
    description: "주말에 몰아보기 좋은 넷플릭스 시리즈 모음",
    isPublic: true,
    createdAt: "2024-07-01T10:30:00+09:00",
    updatedAt: "2024-07-08T16:20:00+09:00",
    subscribeCount: 45
  },
  {
    id: "6b14d3a8-24e8-4f71-7d2a-2e8d7c0a9b4d",
    user: {
      id: "user-uuid-3",
      nickname: "다큐멘터리러버",
      profileImage: "https://example.com/profiles/user3.jpg"
    },
    title: "꼭 봐야 할 다큐멘터리",
    description: "세상을 바라보는 새로운 시각을 제공하는 다큐멘터리 모음",
    isPublic: false,
    createdAt: "2024-07-05T09:15:00+09:00",
    updatedAt: "2024-07-09T11:30:00+09:00",
    subscribeCount: 12
  }
];

// 단일 플레이리스트 예시 데이터
export const samplePlaylistResponse: PlaylistResponse = {
  id: "8c36d5ca-06c6-4e93-9f4c-4c5f4919d83d",
  user: {
    id: "user-uuid-1",
    nickname: "영화매니아",
    profileImage: "https://example.com/profiles/user1.jpg"
  },
  title: "내가 사랑한 영화들",
  description: "감성적인 영화들을 모아봤어요.",
  isPublic: true,
  createdAt: "2024-06-01T13:00:00+09:00",
  updatedAt: "2024-06-20T18:45:00+09:00",
  subscribeCount: 23
};
