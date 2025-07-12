import crs from "../utils/crs/crs.js";

const validateRequest = (schema) => (req, res, next) => {
  try {
    req.vBody = schema.parse(req.body);
    next();
  } catch (error) {
    error.errors.forEach((e) => {
      console.error(`- ${e.path.join(".")}: ${e.message}`);
    });
    return res.status(400).json(crs.ZOD_400_INVALID_INPUT());
  }
};

export default validateRequest;
