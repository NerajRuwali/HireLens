export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getScoreColor = (score) => {
  if (score >= 80) return 'text-green-600 border-green-500 bg-green-50';
  if (score >= 50) return 'text-amber-600 border-amber-500 bg-amber-50';
  return 'text-red-600 border-red-500 bg-red-50';
};

export const slugify = (text) => {
  return text.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]+/g, '');
};
