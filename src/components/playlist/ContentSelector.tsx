import styled from 'styled-components';
import React, { useState } from 'react';
import ContentCard from '../ContentCard.tsx';
import ContentSearchBar from '../ContentSearchBar.tsx';
import type { Content } from '../../type/contents.ts';

interface ContentSelectorProps {
  selectedContents: Array<{ id: string, title: string }>;
  onSelectedContentsChange: (contents: Array<{ id: string, title: string }>) => void;
  contents: Array<Content>;
}

const Label = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
`;

const SearchSection = styled.div`
    margin: 0 0 16px 0;
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
    margin: 8px 0;
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

export const ContentSelector: React.FC<ContentSelectorProps> = ({
  selectedContents,
  onSelectedContentsChange,
  contents
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContents = contents.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleContent = (content: typeof contents[0]) => {
    onSelectedContentsChange(
      selectedContents.some(item => item.id === content.id)
        ? selectedContents.filter(item => item.id !== content.id)
        : [...selectedContents, { id: content.id, title: content.title }]
    );
  };

  return (
    <>
      <Label>선택된 콘텐츠</Label>
      <SelectedItems>
        {selectedContents.map((content) => (
          <SelectedItem
            key={content.id}
            onClick={() => onSelectedContentsChange(
              selectedContents.filter(item => item.id !== content.id)
            )}
          >
            {content.title} ×
          </SelectedItem>
        ))}
      </SelectedItems>

      <SearchSection>
        <ContentSearchBar onSearch={setSearchQuery} />
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
                id={content.id}
                image={content.image}
                category={content.category}
                title={content.title}
                description={content.description}
                rating={content.rating}
                viewers={content.viewers}
                disableClick={true}
              />
            </ContentWrapper>
          ))}
        </ContentList>
      </ContentListContainer>
    </>
  );
};
