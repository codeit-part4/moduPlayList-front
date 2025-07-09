import React from 'react';
import styled from 'styled-components';
import UserProfileInfo from '../components/UserProfileInfo';
import PlayListCard from '../components/PlayListCard';

const Section = styled.div`
  margin-bottom: 32px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 40px;
`;

const dummyPlayLists = [
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
];

const ProfilePage: React.FC = () => {
  return (
    <div>
      <Section>
        <UserProfileInfo />
      </Section>
      <Section>
        <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px'}}>플레이리스트</div>
        <CardGrid>
          {dummyPlayLists.map((item, idx) => (
            <PlayListCard key={idx} {...item} />
          ))}
        </CardGrid>
      </Section>
      <Section>
        <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px'}}>구독 중인 플레이리스트</div>
        <CardGrid>
          {dummyPlayLists.map((item, idx) => (
            <PlayListCard key={idx} {...item} />
          ))}
        </CardGrid>
      </Section>
    </div>
  );
};

export default ProfilePage; 