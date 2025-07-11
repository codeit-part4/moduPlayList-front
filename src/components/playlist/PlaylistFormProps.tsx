import styled from 'styled-components';
import React from 'react';

interface PlaylistFormProps {
  title: string;
  description: string;
  isPublic: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onIsPublicChange: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 32px;
    width: 100%;
    max-width: 500px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-height: 100px;
`;

const Label = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const PrivacyToggle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
export const PlaylistForm: React.FC<PlaylistFormProps> = ({
  title,
  description,
  isPublic,
  onTitleChange,
  onDescriptionChange,
  onIsPublicChange,
  onSubmit
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>플레이리스트 제목</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="플레이리스트 제목을 입력하세요"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>설명</Label>
        <TextArea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="플레이리스트에 대한 설명을 입력하세요"
        />
      </FormGroup>
      <FormGroup>
        <PrivacyToggle>
          <Label>공개 여부</Label>
          <Input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => onIsPublicChange(e.target.checked)}
          />
        </PrivacyToggle>
      </FormGroup>
    </Form>
  );
};
