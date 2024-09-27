export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface ApiResponse {
  data: Category[];
}

export type CategoryDeletePayload = {
  categoryId: number;
};
