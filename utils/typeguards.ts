import { FrontMatter } from  './files';

export const stringTypeGuard = (value: any): value is string => {
  return typeof value === 'string';
}

export const filesTypeGuard = (value: any): value is string[] => {
  return Array.isArray(value)
}

export const frontMatterTypeGuard = (value: any): value is FrontMatter => {
  return typeof value.title === 'string' 
    && typeof value.date === 'object' 
    && typeof value.description === 'string';
}