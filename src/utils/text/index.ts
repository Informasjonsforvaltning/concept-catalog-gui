export const highlightText = (text: string, highlighted?: string) => {
  const pattern = new RegExp(
    `${highlighted?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
    'gi'
  );
  return String(text).replace(pattern, match => `<mark>${match}</mark>`);
};
