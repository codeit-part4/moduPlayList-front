import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
    width: 220px;
    background-color: #f4f4f4;
    padding: 20px;
    border-right: 1px solid #ddd;
`;

const MenuItem = styled.div`
    margin-bottom: 16px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        color: #6e56cf;
    }
`;

const Sidebar: React.FC = () => (
    <SidebarContainer>
        <h3>모두의 플리</h3>
        <MenuItem>⭐ 콘텐츠 같이 보기</MenuItem>
        <MenuItem>⭐ 플레이 리스트</MenuItem>
        <MenuItem>⭐ 프로필</MenuItem>
        <MenuItem>⭐ 사용자 관리</MenuItem>
    </SidebarContainer>
);

export default Sidebar; 