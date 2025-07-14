import React from 'react';
import styled from 'styled-components';
import ContentDetailInfo from '../components/ContentDetailInfo';
import ReviewList from '../components/ReviewList';
import { dummyContents } from '../type/contents.ts';

const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const ContentReviewsPage: React.FC = () => {
  const content = dummyContents[0];
  return (
    <PageLayout>
      <ContentDetailInfo content={content} />
      <ReviewList />
    </PageLayout>
  );
};

export default ContentReviewsPage;
