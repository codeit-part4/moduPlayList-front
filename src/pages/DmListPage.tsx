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
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userNames, setUserNames] = useState<{ [userId: string]: string }>({});
  const navigate = useNavigate();

  // 현재 사용자 ID 가져오기
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      if (res.ok) {
        const userData = await res.json();
        setCurrentUserId(userData.userid);
      }
    } catch (e) {
      console.error('현재 사용자 정보를 가져올 수 없습니다:', e);
    }
  };

  // 상대방 ID 찾기
  const getOtherUserId = (participantIds: string[]) => {
    if (!currentUserId) return null;
    return participantIds.find(id => id !== currentUserId) || null;
  };

  // otherUserId로 유저 이름 가져오기
  const fetchUserName = async (userId: string) => {
    if (!userId || userNames[userId]) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setUserNames(prev => ({ ...prev, [userId]: data.nickname || data.name || userId }));
      } else {
        setUserNames(prev => ({ ...prev, [userId]: userId }));
      }
    } catch {
      setUserNames(prev => ({ ...prev, [userId]: userId }));
    }
  };

  // DM 목록 받아오고, otherUserId별로 유저 이름 요청
  useEffect(() => {
    fetchCurrentUser();
  }, []);

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
        // otherUserId별로 유저 이름 요청
        if (currentUserId && data.content) {
          data.content.forEach((room: any) => {
            const otherUserId = getOtherUserId(room.participantIds);
            if (otherUserId) fetchUserName(otherUserId);
          });
        }
      })
      .catch(() => {
        setError('DM 목록을 불러올 수 없습니다');
        setLoading(false);
      });
  }, [currentUserId]);

  const handleRoomClick = (room: any) => {
    const otherUserId = getOtherUserId(room.participantIds);
    if (otherUserId) {
      navigate(`/dm/${room.id}`, { state: { otherUserId } });
    }
  };

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
            <DmRoomCard key={room.id} onClick={() => handleRoomClick(room)}>
              <Avatar />
              <RoomInfo>
                <UserId>
                  {room.participantIds && currentUserId
                    ? (() => {
                        const otherUserId = getOtherUserId(room.participantIds);
                        return otherUserId
                          ? userNames[otherUserId] || otherUserId
                          : '상대 없음';
                      })()
                    : '상대 없음'}
                </UserId>
              </RoomInfo>
            </DmRoomCard>
          ))}
        </List>
      )}
    </Container>
  );
};

export default DmListPage; 