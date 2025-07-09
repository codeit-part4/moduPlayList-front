import React from 'react';
import styled from 'styled-components';

const PageContentContainer = styled.div`
    flex: 1;
    height: 0;
    overflow-y: auto;
    padding: 24px;
`;

const PageContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <PageContentContainer>{children}</PageContentContainer>
);

export default PageContent; 