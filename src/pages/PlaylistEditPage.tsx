import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { dummyContents } from '../data/contents.ts';
import { API_BASE_URL } from '../api.ts';
import styled from 'styled-components';
import { PlaylistForm } from '../components/playlist/PlaylistFormProps.tsx';
import { ContentSelector } from '../components/playlist/ContentSelector.tsx';
import { FormButton } from '../components/common/FormButton.tsx';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const PlaylistEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [selectedContents, setSelectedContents] = useState<Array<{ id: string, title: string }>>([]);
  const [contents] = useState(dummyContents);

  useEffect(() => {
    // 기존 플레이리스트 데이터 불러오기
    const fetchPlaylist = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/playlists/${id}`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title);
          setDescription(data.description);
          setIsPublic(data.isPublic);
          setSelectedContents(data.contents);
        }
      } catch (err) {
        console.error(err);
        alert('플레이리스트를 불러올 수 없습니다');
      }
    };

    fetchPlaylist();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { title, description, isPublic, contents: selectedContents };
      const res = await fetch(`${API_BASE_URL}/api/playlists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      if (res.ok) {
        navigate('/playlists/my');
      } else {
        const data = await res.json();
        alert(data.message || '수정에 실패했습니다');
      }
    } catch (err) {
      alert('서버와 연결할 수 없습니다');
      console.error(err);
    }
  };

  return (
    <Container>
      <h2>플레이리스트 수정하기</h2>
      <PlaylistForm
        title={title}
        description={description}
        isPublic={isPublic}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onIsPublicChange={setIsPublic}
        onSubmit={handleSubmit}
      />
      <ContentSelector
        selectedContents={selectedContents}
        onSelectedContentsChange={setSelectedContents}
        contents={contents}
      />
      <FormButton type="submit">수정하기</FormButton>
    </Container>
  );
};

export default PlaylistEditPage;
