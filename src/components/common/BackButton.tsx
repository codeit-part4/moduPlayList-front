import styled from 'styled-components';

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    margin-bottom: 20px;
    background: transparent;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    transition: all 0.2s ease;
    white-space: nowrap;

    &::before {
        content: "←";
        font-size: 16px;
    }

    &:hover {
        background: #f5f5f5;
        border-color: #ccc;
    }
`;
