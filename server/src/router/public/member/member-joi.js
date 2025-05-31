const Joi = require("joi");
const mongoose = require("mongoose");
const crs = require("../../../utils/custom-response-codes");
const { createLog } = require("../../../utils/functions");

const memberApplicationSchema = Joi.object({
  rollNumber: Joi.number(),
  fullName: Joi.string().required(),
  fatherName: Joi.string().required(),
  imageUrl: Joi.string().required(),
  category: Joi.string().valid("GENERAL", "SC/ST", "OTHER").default("GENERAL"),
  gender: Joi.string().valid("MALE", "FEMALE", "OTHER").default("MALE"),
  dob: Joi.date().required(),
  program: Joi.string().required(),
  specialization: Joi.string().required(),
  batch: Joi.number().required(),
  email: Joi.string()
    .trim()
    .pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .required()
    .messages({ "string.pattern.base": "Please enter a valid email address" }),
  phoneNumber: Joi.number().required(),
  role: Joi.string()
    .valid(
      "STUDENT UG",
      "STUDENT PG",
      "TEACHER REGULAR",
      "TEACHER ADHOC",
      "NON TEACHING STAFF"
    )
    .default("STUDENT UG"),
});

const joi_applicantDetails = async (req, res, next) => {
  try {
    const { error, value } = memberApplicationSchema.validate(req.body);
    createLog(error);
    if (error)
      return res.status(400).json(crs.VAL400FAIL(error.details[0].message));
    req.body = value;

    return next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

module.exports = { joi_applicantDetails };
