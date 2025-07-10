import React from 'react';
import styled from 'styled-components';
import ContentSearchBar from '../components/ContentSearchBar';
import PlayListCard from '../components/PlayListCard';

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
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
  { title: '시간을 다룬 영화', description: '인터스텔라, 인셉션, 테넷 등 13개의 콘텐츠', updated: '00 시간 전 업데이트 됨', subscribers: '00 명이 구독중' },
];

const PlayListPage: React.FC = () => {
  return (
    <div>
      <ContentSearchBar />
      <CardGrid>
        {dummyPlayLists.map((item, idx) => (
          <PlayListCard key={idx} {...item} />
        ))}
      </CardGrid>
    </div>
  );
};

export default PlayListPage;
