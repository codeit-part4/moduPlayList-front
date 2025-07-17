import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_BASE_URL } from '../api';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 0;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DmRoomCard = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 18px 24px;
  gap: 18px;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #bbb;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserId = styled.div`
  font-weight: bold;
  font-size: 17px;
`;

interface DmRoom {
  id: string;
  participantIds: string[];
}

const DmListPage: React.FC = () => {
  const [rooms, setRooms] = useState<DmRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    fetch(`${API_BASE_URL}/api/dm`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setRooms(data.content || []);
        setLoading(false);
      })
      .catch(() => {
        setError('DM 목록을 불러올 수 없습니다');
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Title>DM 목록</Title>
      {loading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div style={{ color: '#d00' }}>{error}</div>
      ) : rooms.length === 0 ? (
        <div style={{ color: '#888', fontSize: '17px', textAlign: 'center', marginTop: '40px' }}>DM 방이 없습니다</div>
      ) : (
        <List>
          {rooms.map(room => (
            <DmRoomCard key={room.id} onClick={() => navigate(`/dm/${room.id}`, { state: { participantIds: room.participantIds } })}>
              <Avatar />
              <RoomInfo>
                <UserId>{room.participantIds && room.participantIds.length > 0 ? room.participantIds[0] : '상대 없음'}</UserId>
              </RoomInfo>
            </DmRoomCard>
          ))}
        </List>
      )}
    </Container>
  );
};

export default DmListPage; 