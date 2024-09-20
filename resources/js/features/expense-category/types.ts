export interface SubCategory {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  is_default: boolean;
  subcategories: SubCategory[];
}

export interface ApiResponse {
  data: Category[];
}

export type CategoryDeletePayload = {
  categoryId: number;
  subcategoryId?: number;
};
