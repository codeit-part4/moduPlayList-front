import React from 'react';
import styled from 'styled-components';
import ContentDetailInfo from '../components/ContentDetailInfo';
import ReviewList from '../components/ReviewList';

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ContentReviewsPage: React.FC = () => {
  return (
    <PageLayout>
      <ContentDetailInfo />
      <ReviewList />
    </PageLayout>
  );
};

export default ContentReviewsPage; 