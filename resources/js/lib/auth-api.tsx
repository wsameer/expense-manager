import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { z } from 'zod';

import axiosInstance from './api-client';
import { LOGIN_API, LOGOUT_API, REGISTRATION_API } from '@/types/api';

export type User = {
  name: string;
  email: string;
};

export type AuthResponse = {
  jwt: string;
  user: User;
};

export const loginFormSchema = z.object({
  email: z.string().min(8, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z
      .string()
      .min(8, 'Email is required')
      .email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    password_confirmation: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Passwords do not match',
  });

export type LoginInput = z.infer<typeof loginFormSchema>;
export type RegisterInput = z.infer<typeof registerFormSchema>;

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

export const registerWithEmailAndPassword = async (
  data: RegisterInput,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post(REGISTRATION_API, data);
  return response.data;
};

export const login = async (data: LoginInput): Promise<AuthResponse> => {
  const response = await axiosInstance.post(LOGIN_API, data);
  return response.data;
};

export const logout = (): Promise<void> => {
  return axiosInstance.post(LOGOUT_API);
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  /**
   * TODO
   */
  // const user = useUser();
  const user = {
    data: {
      name: 'Sameer',
    },
  };
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};
