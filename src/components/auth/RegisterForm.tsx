// src/components/RegisterForm.tsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../api.ts'
import { StyledLabel } from '../common/StyledLabel.tsx'
import { TextLink } from '../common/TextLink.tsx'
import { Input } from '../common/Input.tsx'
import { BoxTitle } from '../common/BoxTitle.tsx'

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
    `;

const RegisterBox = styled.div`
    width: 350px;
    padding: 40px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: var(--container-bg-color);
    
`;

const Button = styled.button`  
    width: 100%;
    padding: 10px;
    background-color: #6e56cf;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
`;


const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            if (res.ok) {
                alert('회원가입이 완료되었습니다');
                navigate('/');
            } else {
                const data = await res.json();
                alert(data.message || '회원가입에 실패했습니다');
            }
        } catch (err) {
            alert('서버와 연결할 수 없습니다');
        }
    };

    return (
    <RegisterContainer>
        <RegisterBox>
        <BoxTitle>회원가입</BoxTitle>
        <form onSubmit={handleRegister}>
            <StyledLabel>이메일</StyledLabel>
            <Input type="email" placeholder="woody@playlist.io" value={email} onChange={e => setEmail(e.target.value)} required />
            <StyledLabel>이름</StyledLabel>
            <Input type="text" placeholder="woody" value={name} onChange={e => setName(e.target.value)} required />
            <StyledLabel>비밀번호</StyledLabel>
            <Input type="password" placeholder="***********" value={password} onChange={e => setPassword(e.target.value)} required />
            <hr style={{ margin: '20px 0' }} />
            <Button type="submit">가입하기</Button>
        </form>
        <TextLink>
            이미 계정이 있으신가요? <a href="/">로그인</a>
        </TextLink>
        </RegisterBox>
    </RegisterContainer>
    );
};

export default RegisterForm;
