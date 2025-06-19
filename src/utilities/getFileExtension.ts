export const getFileExtension = (url: string): string => {
  const parts = url.split('.');
  if (parts.length === 1) return '';
  return parts.pop()!.toLowerCase();
};