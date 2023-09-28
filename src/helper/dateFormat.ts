export const formatDate = (createdAt:string) => {

  const date = new Date(createdAt);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = date.toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return {formattedDate,formattedTime}
}