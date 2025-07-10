// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar.tsx'
import Topbar from '../components/Topbar.tsx'
import PageContent from '../components/PageContent.tsx'

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
