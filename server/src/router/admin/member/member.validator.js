const Joi = require("joi");
const crs = require("../../../utils/custom-response-codes");

const validateMembershipId = async (req, res, next) => {
  try {
    const { error } = Joi.number()
      .integer()
      .min(100000)
      .max(999999)
      .required()
      .validate(req.body.membershipId);

    if (error)
      return res.status(400).json(crs.VAL400FAIL(error.details[0].message));
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

module.exports = { validateMembershipId };
