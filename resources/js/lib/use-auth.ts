import { useContext } from 'react';
import { AuthContext } from '@/features/auth/auth-provider';
import {
  getCurrentUser,
  login,
  logout,
  registerWithEmailAndPassword,
} from './auth-api';
import { TOKEN_KEY } from '@/utils/constants';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, setUser, isAuthenticated } = context;

  const loginUser = async (email: string, password: string) => {
    const data = await login({ email, password });
    setUser(data.user);
    localStorage.setItem(TOKEN_KEY, data.jwt);
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const data = await registerWithEmailAndPassword({
      name,
      email,
      password,
      password_confirmation: password,
    });
    setUser(data.user);
    localStorage.setItem(TOKEN_KEY, data.jwt);
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    localStorage.removeItem('token');
  };

  const fetchCurrentUser = async () => {
    const data = await getCurrentUser();
    setUser(data);
  };

  return {
    user,
    isAuthenticated,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    fetchCurrentUser,
  };
};
