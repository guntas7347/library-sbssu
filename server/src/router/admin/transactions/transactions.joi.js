const Joi = require("joi");
const mongoose = require("mongoose");
const crs = require("../../../utils/custom-response-codes");
const { createLog } = require("../../../utils/functions");

const transactionJoiSchema = Joi.object({
  memberId: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "ObjectId Validation")
    .messages({
      "any.invalid": "Invalid memberId",
      "any.required": "memberId is required",
    }),

  returnedBookId: Joi.string()
    .allow(null)
    .custom((value, helpers) => {
      if (value !== null && !mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "ObjectId Validation")
    .messages({
      "any.invalid": "Invalid returnedBookId",
    }),

  transactionType: Joi.string().valid("DEBIT", "CREDIT").required(),

  category: Joi.string().required(),

  remark: Joi.string().default("NONE"),

  amount: Joi.number().min(0).required(),

  receiptNumber: Joi.string().optional(),

  paymentMethod: Joi.string().valid("CASH", "ONLINE"),
});

const addTransactionJoi = async (req, res, next) => {
  try {
    const { error } = transactionJoiSchema.validate(req.body);

    if (error)
      return res.status(400).json(crs.VAL400FAIL(error.details[0].message));

    return next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

module.exports = { addTransactionJoi };
