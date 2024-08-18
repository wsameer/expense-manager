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
    .split(' ') // Split the string by spaces into an array of words
    .map((word) => word[0]) // Map each word to its first character
    .join('') // Join all the first characters together
    .toUpperCase(); // Convert the result to uppercase
};
