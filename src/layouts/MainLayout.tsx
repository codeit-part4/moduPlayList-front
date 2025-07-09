// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.tsx';
import Topbar from '../components/layout/Topbar.tsx';
import PageContent from '../components/common/PageContent.tsx';
import styled from 'styled-components';

const LayoutContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
`;

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const MainLayout: React.FC = () => {
    return (
        <LayoutContainer>
            <Sidebar />
            <ContentWrapper>
                <Topbar />
                <PageContent>
                    <Outlet />
                </PageContent>
            </ContentWrapper>
        </LayoutContainer>
    );
};

export default MainLayout;
