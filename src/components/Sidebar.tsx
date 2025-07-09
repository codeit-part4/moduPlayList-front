import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const SidebarContainer = styled.div`
        width: 220px;
        padding: 20px;
        border-right: 1px solid #ddd;
`;

const MenuItem = styled(Link)`
        margin-bottom: 16px;
        font-size: 14px;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        gap: 8px;
        
        &:hover {
                color: #866bff;
        }
`;

const Sidebar: React.FC = () => (
    <SidebarContainer>
        <h2>모두의 플리</h2>
        <MenuItem to={'/home'}>⭐ 콘텐츠 같이 보기</MenuItem>
        <MenuItem to={'/playList'}>⭐ 플레이 리스트</MenuItem>
        <MenuItem to={"/profile"}>⭐ 프로필</MenuItem>
        <MenuItem to={"/profile"}>⭐ 사용자 관리</MenuItem>
    </SidebarContainer>
);

export default Sidebar;
