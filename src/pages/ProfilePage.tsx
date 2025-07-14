import React from 'react';
import styled from 'styled-components';
import UserProfileInfo from '../components/UserProfileInfo';
import PlayListCard from '../components/playlist/PlayListCard.tsx';
import { samplePlaylistResponses } from '../type/playlists.ts';

const Section = styled.div`
  margin-bottom: 32px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const ProfilePage: React.FC = () => {
  return (
    <div>
      <Section>
        <UserProfileInfo />
      </Section>
      <Section>
        <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px'}}>플레이리스트</div>
        <CardGrid>
          {samplePlaylistResponses.map((item, idx) => (
            <PlayListCard key={idx} playlist={item} />
          ))}
        </CardGrid>
      </Section>
      <Section>
        <div style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px'}}>구독 중인 플레이리스트</div>
        <CardGrid>
          {samplePlaylistResponses.map((item, idx) => (
            <PlayListCard key={idx} playlist={item} />
          ))}
        </CardGrid>
      </Section>
    </div>
  );
};

export default ProfilePage;
