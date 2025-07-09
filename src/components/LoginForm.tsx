import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api';

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw; /* 가로 전체 차지 */
    background-color: #fafafa;
    overflow-x: hidden; /* 가로 스크롤 방지 (선택사항) */
`;

const LoginBox = styled.div`
    width: 350px;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    font-size: 14px;
`;

const LoginButton = styled.button`
    width: 100%;
    background-color: #6e56cf;
    color: white;
    padding: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
`;

const TextLink = styled.div`
    text-align: center;
    margin-top: 10px;
    font-size: 12px;
    color: #666;

    a {
    margin: 0 4px;
    color: #6e56cf;
    text-decoration: none;
    }
`;

const SocialButton = styled.button<{ bgColor?: string }>`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ bgColor }) => bgColor || '#fff'};
    cursor: pointer;
`;

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('accessToken', data.accessToken);
                navigate('/home');
            } else {
                const data = await res.json();
                alert(data.message || '로그인에 실패했습니다');
            }
        } catch (err) {
            alert('서버와 연결할 수 없습니다');
        }
    };

    return (
    <LoginContainer>
        <LoginBox>
        <form onSubmit={handleLogin}>
            <label>이메일</label>
            <Input type="email" placeholder="woody@playlist.io" value={email} onChange={e => setEmail(e.target.value)} required />
            <label>비밀번호</label>
            <Input type="password" placeholder="***********" value={password} onChange={e => setPassword(e.target.value)} required />
            <LoginButton type="submit">로그인</LoginButton>
        </form>
        <TextLink>
            <div>
            <a href="#">비밀번호를 잊어버리셨나요?</a>
            </div>
            <div>
                계정이 없으신가요? <Link to="/register">회원가입</Link>
            </div>
        </TextLink>

        <hr style={{ margin: '20px 0' }} />

        <SocialButton>
            Google로 계속하기
        </SocialButton>
        <SocialButton bgColor="#fee500">
            Kakao로 계속하기
        </SocialButton>
        </LoginBox>
    </LoginContainer>
    );
};

export default LoginForm;