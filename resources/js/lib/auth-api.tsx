import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { z } from 'zod';

import axiosInstance from './api-client';

import { useAuth } from './use-auth';
import { LoginResponse, LogoutResponse } from './types';
import { User } from '@/types';
import { AxiosResponse } from 'axios';
import {
  GET_CSRF_TOKEN_API,
  GET_USER_API,
  LOGIN_API,
  LOGOUT_API,
  REGISTRATION_API,
} from '@/utils/constants';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

export const loginFormSchema = z.object({
  email: z.string().min(8, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginInput = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z
      .string()
      .min(8, 'Email is required')
      .email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z
      .string()
      .min(6, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Passwords do not match',
  });

export type RegisterInput = z.infer<typeof registerFormSchema>;

export const getCsrfCookie = async () =>
  await axiosInstance.get(GET_CSRF_TOKEN_API);

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get(GET_USER_API);
  return response.data;
};

export const register = async (data: RegisterInput): Promise<LoginResponse> => {
  const response = await axiosInstance.post(REGISTRATION_API, data);
  return response.data;
};

export const login = async (data: LoginInput): Promise<LoginResponse> => {
  const response = await axiosInstance.post(LOGIN_API, data);
  return response.data;
};

export const logout = (): Promise<AxiosResponse<LogoutResponse>> => {
  return axiosInstance.post(LOGOUT_API);
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};
