const applicationsMongo = require("./applications.schema");

const generateApplicationNumber = (PAN = 200000) => {
  // PAN = Previous Application Number
  const PanYear = parseInt(PAN.toString().substring(0, 2), 10);

  const currentYear = parseInt(
    new Date().getFullYear().toString().substring(2),
    10
  );

  if (PanYear != currentYear) {
    return parseInt(currentYear.toString() + "0001", 10);
  } else {
    return PAN + 1;
  }
};

const createApplication = async (applicantDetails) => {
  return await applicationsMongo.create({
    ...applicantDetails,
    createdAt: new Date(),
    applicationNumber: generateApplicationNumber(
      await getPreviousApplicationNumber()
    ),
    status: "PENDING",
  });
};

const findApplicationById = async (id) => {
  return await applicationsMongo.findById(id);
};

const getPreviousApplicationNumber = async () => {
  const applicationDoc = await applicationsMongo
    .find()
    .sort({ applicationNumber: -1 })
    .limit(1)
    .select("applicationNumber -_id");

  if (applicationDoc.length === 0) {
    return 200000;
  }

  return applicationDoc[0]._doc.applicationNumber;
};

const fetchAllApplications = async (filter) => {
  const { sortSelect, sortValue } = filter;

  const query = applicationsMongo.find({ status: "PENDING" });

  switch (sortSelect) {
    case "applicationNumber":
      query.where({ applicationNumber: sortValue });
      break;

    default:
      break;
  }

  return await query.exec();
};

const fetchOneApplication = async (applicationNumber) => {
  const query = applicationsMongo.findOne({ applicationNumber });
  return await query.exec();
};

const updateApplicationStatus = async (id, status) => {
  return await applicationsMongo.findByIdAndUpdate(id, { status });
};

module.exports = {
  createApplication,
  findApplicationById,
  getPreviousApplicationNumber,
  generateApplicationNumber,
  fetchAllApplications,
  fetchOneApplication,
  updateApplicationStatus,
};
