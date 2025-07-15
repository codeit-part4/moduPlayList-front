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
      id: "user-1",
      nickname: "woody",
      profileImage: "https://example.com/profile1.jpg"
    },
    title: "내가 사랑한 영화들",
    description: "감성적인 영화들을 모아봤어요.",
    isPublic: true,
    createdAt: "2024-06-01T13:00:00+09:00",
    updatedAt: "2024-06-20T18:45:00+09:00",
    subscribeCount: 23
  },
  {
    id: "9d47e6db-17d7-5f94-0e5d-5d6f5020e94e",
    user: {
      id: "user-2",
      nickname: "buzz",
      profileImage: "https://example.com/profile2.jpg"
    },
    title: "시간 순삭 드라마 모음",
    description: "한 번 보기 시작하면 멈출 수 없는 드라마들입니다. 퇴근 후 집에서 편하게 볼 수 있는 드라마들을 엄선했습니다.\n\n특히 주말에 몰아보기 좋은 작품들 위주로 구성했어요. 반전과 스릴이 있는 작품부터 잔잔한 일상 드라마까지 다양하게 준비했답니다.\n\n저도 이 드라마들을 보면서 많은 위로를 받았는데, 여러분도 같은 경험을 하셨으면 좋겠어요. 드라마와 함께하는 특별한 시간 보내세요!",
    isPublic: true,
    createdAt: "2024-06-15T15:30:00+09:00",
    updatedAt: "2024-07-01T12:20:00+09:00",
    subscribeCount: 45
  },
  {
    id: "7a25c4bd-28e8-4f36-9c1b-8e8b5f2d6e3a",
    user: {
      id: "user-3",
      nickname: "jessie",
      profileImage: "https://example.com/profile3.jpg"
    },
    title: "웃음 가득 코미디 컬렉션",
    description: "스트레스 해소에 최고인 코미디 작품들입니다.",
    isPublic: true,
    createdAt: "2024-05-20T09:15:00+09:00",
    updatedAt: "2024-07-10T16:30:00+09:00",
    subscribeCount: 67
  },
  {
    id: "6b14d3ac-39f9-4e25-8d2a-7c9d3f1e5b4c",
    user: {
      id: "user-4",
      nickname: "rex",
      profileImage: "https://example.com/profile4.jpg"
    },
    title: "인생 반전 스릴러",
    description: "긴장감 넘치는 추천작들입니다.",
    isPublic: true,
    createdAt: "2024-06-30T20:45:00+09:00",
    updatedAt: "2024-07-12T11:20:00+09:00",
    subscribeCount: 89
  },
  {
    id: "5c23e2ba-4af0-4d14-7b1b-6d8e2e0a4b3b",
    user: {
      id: "user-5",
      nickname: "slinky",
      profileImage: "https://example.com/profile5.jpg"
    },
    title: "힐링되는 애니메이션",
    description: "지친 일상에 힐링이 필요할 때 보세요.",
    isPublic: true,
    createdAt: "2024-07-01T14:20:00+09:00",
    updatedAt: "2024-07-14T19:15:00+09:00",
    subscribeCount: 34
  },
  {
    id: "4d32f1cb-5be1-3c03-6a0a-5c7d1d9a3a2a",
    user: {
      id: "user-6",
      nickname: "hamm",
      profileImage: "https://example.com/profile6.jpg"
    },
    title: "역대급 SF 컬렉션",
    description: "상상력을 자극하는 SF 작품들입니다.",
    isPublic: true,
    createdAt: "2024-07-05T11:30:00+09:00",
    updatedAt: "2024-07-15T13:40:00+09:00",
    subscribeCount: 156
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
