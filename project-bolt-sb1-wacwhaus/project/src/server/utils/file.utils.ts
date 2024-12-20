import crypto from 'crypto';

export function generateId(prefix: string = ''): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}${timestamp}_${random}`;
}

export function validateFileType(mimetype: string, allowedTypes: string[]): boolean {
  return allowedTypes.includes(mimetype);
}

export function validateFileSize(size: number, maxSize: number): boolean {
  return size <= maxSize;
}