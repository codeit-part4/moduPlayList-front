import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TopbarContainer = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 24px;
    border-bottom: 1px solid #ddd;
`;

const ProfileIcon = styled(Link)`
    margin-left: 10px;
    font-size: 22px;
    color: inherit;
    text-decoration: none;
    vertical-align: middle;
`;

const Topbar: React.FC = () => (
    <TopbarContainer>
        <div />
        <div>
            🔔 <span style={{ margin: '0 10px' }}>1</span>
            <ProfileIcon to="/profile">👤</ProfileIcon>
        </div>
    </TopbarContainer>
);

export default Topbar;
