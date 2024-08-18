import { useContext } from 'react';
import { AuthContext } from '@/features/auth/auth-provider';
import {
  getCsrfCookie,
  getCurrentUser,
  login,
  logout,
  register,
} from './auth-api';
import { TOKEN_KEY } from '@/utils/constants';
import { LoginResponse } from './types';
import { toast } from '@/hooks';
import { AxiosError } from 'axios';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, setUser, isAuthenticated } = context;

  function showErrorToast(
    title = 'Uh oh! Something went wrong.',
    description = 'There was a problem with your request.',
  ) {
    toast({
      variant: 'destructive',
      title,
      description,
    });
  }

  const csrf = async () => await getCsrfCookie();

  const loginUser = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      await csrf();
      const response: LoginResponse = await login({ email, password });
      if (response.success && response.data) {
        const { name, email: userEmail, token } = response.data;
        setUser({ name, email: userEmail });
        localStorage.setItem(TOKEN_KEY, token);
        return true;
      } else {
        showErrorToast('There was a problem with your request.');
        return false;
      }
    } catch (error) {
      // Handle different types of errors
      if (error instanceof AxiosError) {
        showErrorToast('Error setting up request', error.message);
      } else {
        // Handle unexpected errors
        showErrorToast(
          'Uh oh! Something went wrong.',
          'Unexpected error during login',
        );
      }
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const data = await register({
        name,
        email,
        password,
        password_confirmation: password,
      });

      if (data.success) {
        return true;
      } else {
        showErrorToast('Registration failed', 'Please try again.');
        return false;
      }
    } catch (error) {
      showErrorToast(
        'Uh oh! Something went wrong.',
        'Unexpected error during registration. Please try again',
      );
      return false;
    }
  };

  const logoutUser = async () => {
    const { data } = await logout();
    if (data.success) {
      setUser(null);
      localStorage.removeItem(TOKEN_KEY);
      toast({
        variant: 'default',
        description: 'Logout successful',
      });
      return true;
    } else {
      showErrorToast(
        'Uh oh! Something went wrong.',
        'Unexpected error during logout. Please try again',
      );
      return false;
    }
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
