import React from 'react';
import LoginForm from '../../components/login/LoginForm';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    // 로그인 성공 시 호출될 콜백 함수
    const handleLoginSuccess = () => {
        // 로그인 성공 후 메인 페이지로 이동
        navigate('/main');
    };
    return (
        <div className="login-page">
            <h1>로그인</h1>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

export default LoginPage;