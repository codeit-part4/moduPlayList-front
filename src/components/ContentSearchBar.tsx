import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  width: 220px;
  max-width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ContentSearchBar: React.FC = () => {
  return (
    <SearchBarContainer>
      <SearchInput placeholder="검색어를 입력하세요." />
    </SearchBarContainer>
  );
};

export default ContentSearchBar;
