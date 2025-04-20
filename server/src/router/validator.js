const Joi = require("joi");
const crs = require("../utils/custom-response-codes");

const validateObjectId = async (req, res, next) => {
  try {
    const { error } = Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/) // Validates a 24-character hex string
      .required()
      .messages({
        "string.pattern.base": `Invalid ObjectId format`,
      })
      .validate(req.body._id);

    if (error) return res.status(400).json(crs.VAL400FAIL(error));
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const validateStrongPassword = async (req, res, next) => {
  try {
    const { error } = Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.",
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
      })
      .validate(req.body.password);

    if (error)
      return res.status(400).json(crs.VAL400FAIL(error.details[0].message));

    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const validateLoginCreds = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } }) // disables strict TLD checking (e.g. .com, .net only)
        .required()
        .messages({
          "string.email": "Please enter a valid email address",
          "string.empty": "Email is required",
          "any.required": "Email is required",
        }),

      password: Joi.string().min(1).required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required",
      }),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).json(crs.VAL400FAIL(error.details[0].message));

    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

module.exports = {
  validateObjectId,
  validateStrongPassword,
  validateLoginCreds,
};
