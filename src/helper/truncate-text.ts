export const Truncate = (text: string, number: number) => {
  if (text.length > number) {
    return `${text.slice(0, number)}...`;
  }
  return text;
};
