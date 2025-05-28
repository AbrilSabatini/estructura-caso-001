const getIdFromUrl = (url) => {
  const match = url.match(/^\/(\d+)$/);
  return match ? parseInt(match[1]) : null;
};

module.exports = { getIdFromUrl };
