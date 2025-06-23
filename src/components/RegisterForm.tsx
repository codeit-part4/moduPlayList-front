// src/components/RegisterForm.tsx
import React from 'react';
import styled from 'styled-components';

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
    return (
    <RegisterContainer>
        <RegisterBox>
        <label>이메일</label>
        <Input type="email" placeholder="woody@playlist.io" />
        <label>이름</label>
        <Input type="text" placeholder="woody" />
        <label>비밀번호</label>
        <Input type="password" placeholder="***********" />

        <Button>가입하기</Button>

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