// src/layouts/MainLayout.tsx
import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const LayoutContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
`;

const Sidebar = styled.div`
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

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Topbar = styled.div`
    height: 60px;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    justify-content: flex-end;  // 👉 오른쪽 정렬
    padding: 0 24px;
    border-bottom: 1px solid #ddd;
`;

const PageContent = styled.div`
    flex: 1;
    padding: 24px;
`;

const MainLayout: React.FC = () => {
    return (
        <LayoutContainer>
            <Sidebar>
                <h3>모두의 플리</h3>
                <MenuItem>⭐ 콘텐츠 같이 보기</MenuItem>
                <MenuItem>⭐ 플레이 리스트</MenuItem>
                <MenuItem>⭐ 프로필</MenuItem>
                <MenuItem>⭐ 사용자 관리</MenuItem>
            </Sidebar>

            <ContentWrapper>
                <Topbar>
                    <div />
                    <div>
                    🔔 <span style={{ margin: '0 10px' }}>1</span> 👤
                    </div>
                </Topbar>

                <PageContent>
                    <Outlet /> {/* 여기에 각 페이지별 내용이 들어옵니다 */}
                </PageContent>
            </ContentWrapper>
        </LayoutContainer>
    );
};

export default MainLayout;
