import { atom } from 'recoil';
import { User } from '../models/user';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null,
    isLoggedIn: false,
  },
});
