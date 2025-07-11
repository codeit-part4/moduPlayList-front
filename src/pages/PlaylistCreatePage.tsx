import React, { useState } from 'react';
import { dummyContents } from '../type/contents.ts';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api.ts';
import { PlaylistForm } from '../components/playlist/PlaylistFormProps.tsx';
import { ContentSelector } from '../components/playlist/ContentSelector.tsx';
import styled from 'styled-components';
import { FormButton } from '../components/common/FormButton.tsx';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const PlaylistCreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [selectedContents, setSelectedContents] = useState<Array<{ id: string, title: string }>>([]);
  const [contents] = useState(dummyContents);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { title, description, isPublic, contents: selectedContents };
      const res = await fetch(API_BASE_URL + '/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      if (res.ok) {
        navigate('/playlists/my');
      } else {
        const data = await res.json();
        alert(data.message || '생성에 실패했습니다');
      }
    } catch (err) {
      alert('서버와 연결할 수 없습니다');
      console.error(err);
    }
  };

  return (
    <Container>
      <h2>플레이리스트 추가하기</h2>
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
      <FormButton type="submit">생성하기</FormButton>
    </Container>
  );
};

export default PlaylistCreatePage;
