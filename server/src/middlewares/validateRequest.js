const validate = (schemas) => async (req, res, next) => {
  try {
    const q = req.query ? !!Object.keys(req.query).length : false;
    const b = req.body ? !!Object.keys(req.body).length : false;

    if (q) req.validatedQuery = await schemas.parse(req.query);
    if (b) req.body = await schemas.parse(req.body);

    next();
  } catch (error) {
    error.errors?.forEach((e) => {
      console.error(`- ${e.path.join(".")}: ${e.message}`);
    });

    console.log(error);
    const firstErrorMessage = error.errors?.[0]?.message || "Invalid input";

    // Manually construct the response object to include the custom message.
    return res.status(400).json({
      code: "ZOD_400_INVALID_INPUT",
      message: firstErrorMessage,
      data: null,
    });
  }
};

export default validate;
