import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../api.ts'
import { StyledLabel } from '../common/StyledLabel.tsx'
import { TextLink } from '../TextLink.tsx'
import { Input } from '../common/Input.tsx'
import { BoxTitle } from '../common/BoxTitle.tsx'

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100vw; /* 가로 전체 차지 */
    overflow-x: hidden; /* 가로 스크롤 방지 (선택사항) */
`;

const LoginBox = styled.div`
    width: 350px;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: var(--container-bg-color);
`;

const LoginButton = styled.button`
    width: 100%;
    background-color: #6e56cf;
    padding: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
`;

const SocialButton = styled.button<{ $bgColor?: string }>`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $bgColor }) => $bgColor || '#fff'};
    cursor: pointer;
    color: #6e56cf;
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
                credentials: 'include', // HttpOnly 쿠키 사용
            });
            if (res.ok) {
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
            <BoxTitle>로그인</BoxTitle>
        <form onSubmit={handleLogin}>
            <StyledLabel>이메일</StyledLabel>
            <Input type="email" placeholder="woody@playlist.io" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email"/>
            <StyledLabel>비밀번호</StyledLabel>
            <Input type="password" placeholder="***********" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
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

        <hr style={{ margin: '15px 0' }} />

        <SocialButton $bgColor="#E6E6E6">
            Google로 계속하기
        </SocialButton>
        <SocialButton $bgColor="#fee500">
            Kakao로 계속하기
        </SocialButton>
        </LoginBox>
    </LoginContainer>
    );
};

export default LoginForm;
