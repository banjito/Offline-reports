export const formatDateTime = (date: Date): string => {
  return date.toISOString();
};

export const formatDisplayDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString();
};

export const now = (): string => formatDateTime(new Date());