export type LoginResponse = {
  success: boolean;
  data?: {
    name: string;
    email: string;
    token: string;
  };
  message?: string;
};
