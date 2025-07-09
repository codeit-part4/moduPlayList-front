import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 16px;
`;

const ReviewItem = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #bbb;
  margin-right: 12px;
`;

const ReviewContent = styled.div`
  flex: 1;
`;

const ReviewRating = styled.span`
  font-weight: bold;
  color: #6e56cf;
  margin-right: 6px;
`;

const ReviewText = styled.span`
  font-size: 15px;
`;

const InputBox = styled.input`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 16px;
`;

const dummyReviews = [
  { rating: 4.7, text: '최고의 작품입니다. 여러 번 봐도 재미있네요.' },
  { rating: 4.7, text: '최고의 작품입니다. 여러 번 봐도 재미있네요.' },
  { rating: 4.7, text: '최고의 작품입니다. 여러 번 봐도 재미있네요.' },
  { rating: 4.7, text: '최고의 작품입니다. 여러 번 봐도 재미있네요.' },
];

const ReviewList: React.FC = () => (
  <Container>
    <Title>리뷰</Title>
    {dummyReviews.map((review, idx) => (
      <ReviewItem key={idx}>
        <Avatar />
        <ReviewContent>
          <ReviewRating>{review.rating}</ReviewRating>
          <ReviewText>{review.text}</ReviewText>
        </ReviewContent>
      </ReviewItem>
    ))}
    <InputBox placeholder="리뷰를 등록해주세요." />
  </Container>
);

export default ReviewList; 