import React, { useState, type FormEvent } from 'react';
import styled from 'styled-components';

interface ContentSearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBarContainer = styled.form`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 600px;
    margin: 20px 0;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

const SearchButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const ContentSearchBar: React.FC<ContentSearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery.trim());
    };

    return (
        <SearchBarContainer onSubmit={handleSubmit}>
            <SearchInput
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색어를 입력하세요..."
            />
            <SearchButton type="submit">검색</SearchButton>
        </SearchBarContainer>
    );
};

export default ContentSearchBar;
