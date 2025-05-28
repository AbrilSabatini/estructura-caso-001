const sendJson = (res, statusCode, data) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
};

const sendError404 = (res, message) => {
  const msg = message ? message : "Page Not Found";
  return sendJson(res, 404, { error: msg });
};

module.exports = { sendJson, sendError404 };
