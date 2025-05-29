const validateProduct = (body) => {
  const errors = [];

  if (body.name === undefined) {
    errors.push("'name' is required");
  } else if (typeof body.name !== "string") {
    errors.push("'name' must be a string");
  }

  if (body.description === undefined) {
    errors.push("'description' is required");
  } else if (typeof body.description !== "string") {
    errors.push("'description' must be a string");
  }

  return errors;
};

module.exports = { validateProduct };
