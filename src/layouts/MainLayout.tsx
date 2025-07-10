import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { Outlet } from 'react-router-dom';
import PageContent from '../components/PageContent.tsx';

const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh;
    width: 100%;
`;

const SidebarWrapper = styled.div`
    width: 240px;
    min-width: 240px;
    flex-shrink: 0;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
`;

const MainWrapper = styled.div`
    flex: 1;
    margin-left: 240px; // Sidebar 너비만큼 마진
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
`;

const TopbarWrapper = styled.div`
    position: sticky;
    top: 0;
    z-index: 100;
`;

const MainLayout: React.FC = () => {
    return (
        <LayoutContainer>
            <SidebarWrapper>
                <Sidebar />
            </SidebarWrapper>
            <MainWrapper>
                <TopbarWrapper>
                    <Topbar />
                </TopbarWrapper>
              <PageContent>
                <Outlet />
              </PageContent>
            </MainWrapper>
        </LayoutContainer>
    );
};

export default MainLayout;
