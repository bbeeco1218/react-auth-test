import { AuthTokens } from '../../models/authTokens';
import baseAxios from '../_base/baseAxios';

export interface IauthRepository {
  login(username: string, password: string): Promise<AuthTokens>;
}

class AuthRepository implements IauthRepository {
  async login(username: string, password: string): Promise<AuthTokens> {
    const response = await baseAxios.post('/token/', {
      username: username,
      password: password,
    });
    return response.data;
  }
}

const authRepisitory = new AuthRepository();

export default authRepisitory;
