export interface Content {
  id: string;
  externalId: string;
  source: string;
  title: string;
  category: string;
  genres: string[];
  releasedAt: string;
  viewers?: number;
  description: string;
  rating: number;
  reviews: number;
  viewers: number;
  posterUrl: string;
}

export interface ContentResponse {
  data: Content[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}


export const dummyContents = [
  {
    id: '1',
    title: 'React 기초 마스터하기',
    description: '리액트의 핵심 개념과 실전 활용법을 배워보세요',
    category: '프로그래밍',
    rating: 4.8,
    viewers: 1234,
    reviews: 4332,
    posterUrl: 'https://picsum.photos/seed/react/200/300'
  },
  {
    id: '2',
    title: 'UX/UI 디자인 원칙',
    description: '사용자 중심의 인터페이스 디자인 가이드',
    category: '디자인',
    rating: 3.3,
    viewers: 856,
    reviews: 123,
    posterUrl: 'https://picsum.photos/seed/design/200/300'
  },
  {
    id: '3',
    title: '디지털 마케팅 전략',
    description: '효과적인 온라인 마케팅 전략 수립하기',
    category: '마케팅',
    rating: 0.2,
    viewers: 673,
    reviews: 321,
    posterUrl: 'https://picsum.photos/seed/marketing/200/300'
  },
  {
    id: '4',
    title: 'TypeScript 실전 프로젝트',
    description: '타입스크립트로 안전한 코드 작성하기',
    category: '프로그래밍',
    rating: 4.9,
    viewers: 892,
    reviews: 55,
    posterUrl: 'https://picsum.photos/seed/typescript/200/300'
  },
  {
    id: '5',
    title: '모션 그래픽 기초',
    description: 'After Effects를 활용한 모션 디자인',
    category: '디자인',
    rating: 4.6,
    viewers: 445,
    reviews: 1,
    posterUrl: 'https://picsum.photos/seed/motion/200/300'
  },
  {
    id: '6',
    title: '데이터 분석 입문',
    description: 'Python을 활용한 데이터 분석 기초',
    category: '데이터',
    rating: 4.7,
    viewers: 1023,
    reviews: 432532,
    posterUrl: 'https://picsum.photos/seed/data/200/300'
  },
  {
    id: '7',
    title: '웹 보안 기초',
    description: '웹 애플리케이션 보안 위협과 대응 방안',
    category: '보안',
    rating: 4.8,
    viewers: 567,
    reviews: 123,
    posterUrl: 'https://picsum.photos/seed/security/200/300'
  },
  {
    id: '8',
    title: '클라우드 서비스 구축',
    description: 'AWS를 활용한 클라우드 인프라 구축',
    category: '클라우드',
    rating: 4.6,
    viewers: 789,
    reviews: 456,
    posterUrl: 'https://picsum.photos/seed/cloud/200/300'
  },
  {
    id: '9',
    title: 'AI 기초와 머신러닝',
    description: '인공지능과 머신러닝의 기본 개념 이해하기',
    category: '인공지능',
    rating: 4.5,
    viewers: 1567,
    reviews: 101,
    posterUrl: 'https://picsum.photos/seed/ai/200/300'
  },
  {
    id: '10',
    title: '블록체인 기술 이해',
    description: '블록체인 기술의 원리와 활용 사례',
    category: '블록체인',
    rating: 4.3,
    viewers: 678,
    reviews: 100,
    posterUrl: 'https://picsum.photos/seed/blockchain/200/300'
  },
  {
    id: '11',
    title: '게임 개발 입문',
    description: 'Unity를 활용한 게임 개발 기초',
    category: '게임개발',
    rating: 4.7,
    viewers: 2341,
    reviews: 5,
    posterUrl: 'https://picsum.photos/seed/game/200/300'
  },
  {
    id: '12',
    title: 'DevOps 실무 가이드',
    description: '현대적인 DevOps 방법론과 도구 활용',
    category: '데브옵스',
    rating: 4.4,
    viewers: 890,
    reviews: 111111111,
    posterUrl: 'https://picsum.photos/seed/devops/200/300'
  },
  {
    id: '13',
    title: '모바일 앱 디자인',
    description: '사용자 경험을 고려한 모바일 앱 디자인',
    category: '디자인',
    rating: 4.8,
    viewers: 1234,
    reviews: 4332,
    posterUrl: 'https://picsum.photos/seed/mobile/200/300'
  },
  {
    id: '14',
    title: '빅데이터 분석 기술',
    description: '대용량 데이터 처리와 분석 기법',
    category: '데이터',
    rating: 4.6,
    viewers: 945,
    reviews: 4332,
    posterUrl: 'https://picsum.photos/seed/bigdata/200/300'
  },
  {
    id: '15',
    title: '네트워크 보안',
    description: '네트워크 보안 위협과 대응 전략',
    category: '보안',
    rating: 4.5,
    viewers: 756,
    reviews: 4332,
    posterUrl: 'https://picsum.photos/seed/network/200/300'
  }
];
