import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getInitials = (name: string): string => {
  if (!name) {
    return '';
  }
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

export function capitalize(input: string): string {
  if (!input) return '';
  return input.charAt(0).toUpperCase() + input.slice(1);
}
