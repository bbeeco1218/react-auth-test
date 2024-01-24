import useAuth from '../hooks/useAuth';

const LoginSuccessScreen = () => {
  const { auth, logout } = useAuth();

  return (
    <div>
      <h1>로그인 성공 ! {auth.user?.username}</h1>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

export default LoginSuccessScreen;
