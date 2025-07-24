import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentSearchBar from '../components/ContentSearchBar';
import PlayListCard from '../components/playlist/PlayListCard.tsx';
import { API_BASE_URL } from '../api';
// import { FaPlus } from 'react-icons/fa'; // 삭제

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const PlayListPage: React.FC = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIsPublic, setNewIsPublic] = useState(true);
  const [creating, setCreating] = useState(false);

  // useEffect 바깥으로 이동
  const fetchPlaylists = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/playlists/`);
      if (!res.ok) throw new Error('플레이리스트를 불러오지 못했습니다');
      const data = await res.json();
      // user.userName을 user.nickname으로 변환
      const mapped = data.map((item: any) => ({
        ...item,
        user: {
          ...item.user,
          nickname: item.user.userName,
        },
      }));
      setPlaylists(mapped);
    } catch (err: any) {
      setError(err.message || '에러가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      setCreating(false);
      return;
    }
    try {
      const payload = {
        title: newTitle,
        description: newDescription,
        isPublic: newIsPublic,
      };
      const res = await fetch(`${API_BASE_URL}/api/playlists/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert('생성되었습니다');
        setShowModal(false);
        setNewTitle('');
        setNewDescription('');
        setNewIsPublic(true);
        fetchPlaylists();
      } else {
        const data = await res.json();
        alert(data.message || '생성에 실패했습니다');
      }
    } catch (err) {
      alert('서버와 연결할 수 없습니다');
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <ContentSearchBar onSearch={function(): void {
                throw new Error('Function not implemented.');
            } } />
        <button
          style={{
            marginLeft: 8,
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            width: 60,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            cursor: 'pointer',
            fontWeight: 600,
          }}
          title="플레이리스트 추가"
          onClick={() => setShowModal(true)}
        >
          추가
        </button>
      </div>
      {showModal && (
        <div style={{
          position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <form
            onSubmit={handleCreate}
            style={{ background: 'white', padding: 32, borderRadius: 8, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <h3 style={{ margin: 0 }}>플레이리스트 생성</h3>
            <label>
              제목
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
                style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 8 }}
              />
            </label>
            <label>
              설명
              <textarea
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 8, minHeight: 60 }}
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={newIsPublic}
                onChange={e => setNewIsPublic(e.target.checked)}
              />
              공개 여부
            </label>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: 10, borderRadius: 4, border: '1px solid #ccc', background: '#f5f5f5', cursor: 'pointer' }}>취소</button>
              <button type="submit" disabled={creating} style={{ flex: 1, padding: 10, borderRadius: 4, border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer' }}>{creating ? '생성 중...' : '생성'}</button>
            </div>
          </form>
        </div>
      )}
      <CardGrid>
        {playlists.map((item: any, idx: number) => (
          <PlayListCard key={item.id || idx} playlist={item} disableClick={false} />
        ))}
      </CardGrid>
    </div>
  );
};

export default PlayListPage;
