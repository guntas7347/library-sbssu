const Joi = require("joi");
const crs = require("../../../utils/custom-response-codes");

const staffValidationSchema = Joi.object({
  idNumber: Joi.number().integer().required(),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^[6-9][0-9]{9}$/)
    .message("Phone number must be exactly 10 digits and start with 6-9")
    .optional()
    .allow(""),
  dateOfBirth: Joi.date().optional().allow(null),
  gender: Joi.string().valid("Male", "Female", "Other").optional().allow(""),
  address: Joi.string().optional().allow(""),
  emergencyContact: Joi.string().optional().allow(""),
  employeeId: Joi.string().optional().allow(""),
  department: Joi.string().optional().allow(""),
  designation: Joi.string().optional().allow(""),
  joiningDate: Joi.date().optional().allow(null),
  employmentStatus: Joi.string().optional().allow(""),
  profilePictureURL: Joi.string().uri().optional().allow(""),
  role: Joi.string().valid("STAFF").optional().default("STAFF"),
  rights: Joi.array().items(Joi.string().required()).min(1).required(),
});

const joi_staff_create = async (req, res, next) => {
  try {
    const { error, value } = staffValidationSchema.validate(req.body);
    if (error) return res.status(400).json(crs.CUSTOMRES(error.message));
    req.body = value;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

module.exports = { joi_staff_create };
