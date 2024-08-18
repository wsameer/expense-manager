import { API_BASE_URL } from '@/utils/constants';

const AUTH = API_BASE_URL + 'auth/';

export const GET_CSRF_TOKEN_API = API_BASE_URL + 'sanctum/csrf-cookie';
export const REGISTRATION_API = AUTH + 'register';
export const LOGIN_API = AUTH + 'login';
export const LOGOUT_API = AUTH + 'logout';
export const GET_USER_API = AUTH + 'me';
