import { useRecoilState } from 'recoil';
import { authState } from '../states/authState';
import { useEffect } from 'react';
import authRepository from '../data/auth/authRepository';

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      setAuth({
        user: null,
        isLoggedIn: false,
      });
      return;
    }

    const { accessToken, username } = JSON.parse(storedUser);

    setAuth({
      user: {
        username: username,
      },
      isLoggedIn: accessToken ? true : false,
    });
  }, [setAuth]);

  const login = async (username: string, password: string) => {
    try {
      const tokens = await authRepository.login(username, password);
      const user = {
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
        username: username,
        password: password,
      };

      localStorage.setItem('user', JSON.stringify(user));
      setAuth({
        user: {
          username: username,
        },
        isLoggedIn: true,
      });
    } catch (error) {
      console.error('Login failed:', error);
      setAuth({ user: null, isLoggedIn: false });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');

    setAuth({ user: null, isLoggedIn: false });
  };

  return { auth, login, logout };
};

export default useAuth;
