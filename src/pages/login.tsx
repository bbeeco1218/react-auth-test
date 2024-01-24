import { ChangeEvent, useState } from 'react';
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // 이벤트 핸들러 (타입 지정)
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    login(username, password);
  };
  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          placeholder="Text Field 1"
          value={username}
          onChange={handleUsernameChange}
          style={{ marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Text Field 2"
          value={password}
          onChange={handlePasswordChange}
          style={{ marginBottom: '10px' }}
        />
        <button onClick={handleLogin}>Login</button>
      </header>
    </div>
  );
};

export default LoginScreen;
