const Joi = require("joi");
const crs = require("../../../utils/custom-response-codes");

const validateIssueBookDetails = async (req, res, next) => {
  try {
    const { error } = Joi.object({
      accessionNumber: Joi.number()
        .integer()
        .min(1) // Ensure it's a positive number
        .required(),
      cardNumber: Joi.number()
        .integer()
        .min(10000000) // Ensure it's at least an 8-digit number
        .max(99999999) // Ensure it's at most an 8-digit number
        .required(),
      issueDate: Joi.date()
        .iso() // Ensure it's a valid date string, e.g., 'YYYY-MM-DD'
        .required(),
    }).validate(req.body);

    if (error)
      return res.status(400).json(crs.VAL400FAIL(error.details[0].message));

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

module.exports = { validateIssueBookDetails };
