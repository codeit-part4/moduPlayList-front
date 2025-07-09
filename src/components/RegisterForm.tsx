// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api';

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw;
    background-color: #fafafa;
    `;

const RegisterBox = styled.div`
    width: 350px;
    padding: 40px;
    border-radius: 8px;
    border: 1px solid #bfaaff;
    background-color: #fff;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    font-size: 14px;
    border: 1px solid #aaa;
    border-radius: 4px;
`;

const Button = styled.button`  
    width: 100%;
    padding: 10px;
    background-color: #6e56cf;
    color: white;
    border: none;
    margin-top: 20px;
    border-radius: 6px;
    cursor: pointer;
`;

const LinkText = styled.div`
    text-align: center;
    margin-top: 12px;
    font-size: 13px;

    a {
    color: #6e56cf;
    margin-left: 4px;
    text-decoration: none;
    }
    `;

    const Divider = styled.hr`
    margin: 20px 0;
`;

const SocialButton = styled.button<{ bgColor?: string }>`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: ${({ bgColor }) => bgColor || '#fff'};
    display: flex;
    align-items: center;
    justify-content: center;
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
        <form onSubmit={handleRegister}>
            <label>이메일</label>
            <Input type="email" placeholder="woody@playlist.io" value={email} onChange={e => setEmail(e.target.value)} required />
            <label>이름</label>
            <Input type="text" placeholder="woody" value={name} onChange={e => setName(e.target.value)} required />
            <label>비밀번호</label>
            <Input type="password" placeholder="***********" value={password} onChange={e => setPassword(e.target.value)} required />

            <Button type="submit">가입하기</Button>
        </form>
        <LinkText>
            이미 계정이 있으신가요? <a href="/">로그인</a>
        </LinkText>

        <Divider />

        <SocialButton>
            Google로 계속하기
        </SocialButton>
        <SocialButton bgColor="#fee500">
            Kakao로 계속하기
        </SocialButton>
        </RegisterBox>
    </RegisterContainer>
    );
};

export default RegisterForm;