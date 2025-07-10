import React, { useState } from 'react';
import styled from 'styled-components';
import { API_BASE_URL } from '../api.ts';
import { useNavigate } from 'react-router-dom';
import ContentCard from '../components/ContentCard';
import ContentSearchBar from '../components/ContentSearchBar';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 32px;
    width: 100%;
    max-width: 500px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-height: 100px;
`;

const Label = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const SearchSection = styled.div`
    margin: 32px 0 16px 0;
`;

const ContentListContainer = styled.div`
    max-width: 100%;
    position: relative;
    flex: 1; // 남은 공간 채우기
    display: flex;
    flex-direction: column;
`;

const ContentList = styled.div`
    display: flex;
    gap: 24px;
    overflow-x: auto;
    overflow-y: hidden; // 세로 스크롤 방지
    padding-bottom: 16px;
    max-width: 100%;
    width: fit-content;
    
    &::-webkit-scrollbar {
        height: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
        
        &:hover {
            background: #555;
        }
    }
`;

const SelectedItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 16px 0;
    min-height: 40px; // 최소 높이 설정
`;

const SelectedItem = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: var(--selected-color);
    
    &:hover {
        background: var(--selected-color-hover);
    }
`;

const PrivacyToggle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ContentWrapper = styled.div`
    position: relative;
    cursor: pointer;
    width: 220px;
    flex-shrink: 0; // 카드가 줄어들지 않도록 설정
    
    &:hover {
        opacity: 0.9;
    }
`;

const CheckboxOverlay = styled.div<{ checked: boolean }>`
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${props => props.checked ? '#6e56cf' : '#fff'};
    border: 2px solid #6e56cf;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 1;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const PlayListCreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [selectedContents, setSelectedContents] = useState<Array<{ id: number, title: string }>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [contents] = useState([
    {
      id: 1,
      title: 'React 기초 마스터하기',
      description: '리액트의 핵심 개념과 실전 활용법을 배워보세요',
      category: '프로그래밍',
      rating: 4.8,
      viewers: 1234,
      image: 'https://picsum.photos/seed/react/200/300'
    },
    {
      id: 2,
      title: 'UX/UI 디자인 원칙',
      description: '사용자 중심의 인터페이스 디자인 가이드',
      category: '디자인',
      rating: 4.7,
      viewers: 856,
      image: 'https://picsum.photos/seed/design/200/300'
    },
    {
      id: 3,
      title: '디지털 마케팅 전략',
      description: '효과적인 온라인 마케팅 전략 수립하기',
      category: '마케팅',
      rating: 4.5,
      viewers: 673,
      image: 'https://picsum.photos/seed/marketing/200/300'
    },
    {
      id: 4,
      title: 'TypeScript 실전 프로젝트',
      description: '타입스크립트로 안전한 코드 작성하기',
      category: '프로그래밍',
      rating: 4.9,
      viewers: 892,
      image: 'https://picsum.photos/seed/typescript/200/300'
    },
    {
      id: 5,
      title: '모션 그래픽 기초',
      description: 'After Effects를 활용한 모션 디자인',
      category: '디자인',
      rating: 4.6,
      viewers: 445,
      image: 'https://picsum.photos/seed/motion/200/300'
    },
    {
      id: 6,
      title: '데이터 분석 입문',
      description: 'Python을 활용한 데이터 분석 기초',
      category: '데이터',
      rating: 4.7,
      viewers: 1023,
      image: 'https://picsum.photos/seed/data/200/300'
    },
    {
      id: 7,
      title: '웹 보안 기초',
      description: '웹 애플리케이션 보안 위협과 대응 방안',
      category: '보안',
      rating: 4.8,
      viewers: 567,
      image: 'https://picsum.photos/seed/security/200/300'
    },
    {
      id: 8,
      title: '클라우드 서비스 구축',
      description: 'AWS를 활용한 클라우드 인프라 구축',
      category: '클라우드',
      rating: 4.6,
      viewers: 789,
      image: 'https://picsum.photos/seed/cloud/200/300'
    }
  ]);
  const navigate = useNavigate();

  const filteredContents = contents.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { title, description, isPublic };
      const res = await fetch(API_BASE_URL + '/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      if (res.ok) {
        navigate('/playlists/my');
      } else {
        const data = await res.json();
        alert(data.message || '로그인에 실패했습니다');
      }
    } catch (err) {
      alert('서버와 연결할 수 없습니다');
      console.error(err);
    }
  };

  const toggleContent = (content: typeof contents[0]) => {
    setSelectedContents(prev =>
      prev.some(item => item.id === content.id)
        ? prev.filter(item => item.id !== content.id)
        : [...prev, { id: content.id, title: content.title }]
    );
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>플레이리스트 제목</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="플레이리스트 제목을 입력하세요"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>설명</Label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="플레이리스트에 대한 설명을 입력하세요"
          />
        </FormGroup>
        <FormGroup>
          <PrivacyToggle>
            <Label>공개 여부</Label>
            <Input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
          </PrivacyToggle>
        </FormGroup>
      </Form>
      <Label>선택된 콘텐츠</Label>
      <SelectedItems>

        {selectedContents.map((content) => (
          <SelectedItem
            key={content.id}
            onClick={() => setSelectedContents(prev =>
              prev.filter(item => item.id !== content.id)
            )}
          >
            {content.title} ×
          </SelectedItem>
        ))}
      </SelectedItems>

      <SearchSection>
        <ContentSearchBar onSearch={handleSearch} />
      </SearchSection>

      <ContentListContainer>
        <ContentList>
          {filteredContents.map((content) => (
            <ContentWrapper
              key={content.id}
              onClick={() => toggleContent(content)}
            >
              <CheckboxOverlay checked={selectedContents.some(item => item.id === content.id)}>
                {selectedContents.some(item => item.id === content.id) && '✓'}
              </CheckboxOverlay>
              <ContentCard
                image={content.image}
                category={content.category}
                title={content.title}
                description={content.description}
                rating={content.rating}
                viewers={content.viewers}
              />
            </ContentWrapper>
          ))}
        </ContentList>
      </ContentListContainer>
    </Container>
  );
};

export default PlayListCreatePage;
