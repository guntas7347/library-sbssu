const Joi = require("joi");
const crs = require("../../../utils/custom-response-codes");

const bookValidationSchema = Joi.object({
  isbn: Joi.number().optional(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  placeAndPublishers: Joi.string().optional(),
  publicationYear: Joi.number().optional(),
  pages: Joi.number().optional(),
  volume: Joi.number().optional(),
  source: Joi.string().optional(),
  category: Joi.string().required(),
  cost: Joi.number().optional(),
  callNumber: Joi.number().optional(),
  accessionNumbers: Joi.array()
    .items(Joi.number().required())
    .min(1)
    .required(),
  tags: Joi.array().items(Joi.string().required()).min(1).optional(),
});

const validateAccessionNumber = async (req, res, next) => {
  try {
    const { error, value } = Joi.number()
      .integer()
      .min(1)
      .required()
      .validate(req.body.accessionNumber);

    if (error)
      return res.status(400).json(crs.VAL400FAIL(error.details[0].message));
    req.body.accessionNumber = value;
    return next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const validateBook = async (req, res, next) => {
  try {
    const { error, value } = bookValidationSchema.validate(req.body.book);
    if (error) return res.status(400).json(crs.VAL400FAIL(error.message));
    req.body.book = value;
    return next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const validate_books_accession_create = async (req, res, next) => {
  try {
    const { error, value } = Joi.object({
      _id: Joi.string().required(),
      category: Joi.string().required(),
      accessionNumbers: Joi.array()
        .items(Joi.number().required())
        .min(1)
        .required(),
    }).validate(req.body);

    if (error) return res.status(400).json(crs.VAL400FAIL(error));
    req.body = value;
    return next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

module.exports = {
  validateAccessionNumber,
  validateBook,
  validate_books_accession_create,
};
