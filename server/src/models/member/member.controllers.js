const Member = require("./member.schema");

const getMembers = async (queryParam) => {
  const { filter, filterValue, page = 1 } = queryParam;
  let totalPages = 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  console.log(filterValue);

  const query = Member.find({ status: "ACTIVE" });
  switch (filter) {
    case "allCategories":
      query.where();
      break;

    case "fullName":
      query.where("fullName").regex(new RegExp(filterValue, "i"));
      break;

    default:
      query.where({ [filter]: filterValue });
      break;
  }
  totalPages = Math.ceil((await countMemberDocs()) / pageSize);

  query.skip(skip).limit(pageSize);
  return { studentsArray: await query.exec(), totalPages };
};

const getMemberByRollNumber = async (rollNumber, populate = false, select) => {
  const query = Member.findOne({ rollNumber });

  if (populate) query.populate({ path: "libraryCards", select });

  return await query.exec();
};

const getMember = async (filter) => {
  return await Member.findOne(filter).populate("libraryCards");
};

const getMemberById = async (_id, populate = false, selectLibraryCard) => {
  const query = Member.findById(_id);
  if (populate)
    query.populate({ path: "libraryCards", select: selectLibraryCard });

  return await query.exec();
};

const addLibraryCardToMember = async (_id, libraryCardId, session) => {
  return await Member.findByIdAndUpdate(
    _id,
    {
      $push: { libraryCards: libraryCardId },
    },
    { session }
  );
};

const countMemberDocs = async (filter) => await Member.countDocuments(filter);

const updateMemberById = async (_id, updatedDoc, session) => {
  return await Member.findByIdAndUpdate(_id, updatedDoc, {
    session,
    new: true,
  });
};

const getLatestMembershipId = async () => {
  const member = await Member.findOne().sort({ membershipId: -1 });
  if (!member) return 200000;
  return member.membershipId;
};

const searchMembers = async (param) => {
  const { search } = param;
  let searchNumber = Number(search);
  if (Number.isNaN(searchNumber)) searchNumber = 0;

  const query = Member.find({
    $or: [
      { fullName: { $regex: search, $options: "i" } },
      { rollNumber: searchNumber },
      { membershipId: searchNumber },
    ],
  });

  query.limit(2).select("_id fullName membershipId");

  return await query.exec();
};

const quickSearchMember = async ({ search }) => {
  let searchNumber = Number(search);
  if (Number.isNaN(searchNumber)) searchNumber = 0;

  const query = Member.find({
    $or: [
      { fullName: { $regex: search, $options: "i" } },
      { rollNumber: searchNumber },
      { phoneNumber: searchNumber },
      { membershipId: searchNumber },
    ],
  });

  query.limit(10).select("_id fullName membershipId fatherName dob rollNumber");

  return await query.exec();
};

const getApplicationById = async (id) => {
  return await Member.findOne({ _id: id, status: "APPLIED" });
};

const findApplications = async (filter) => {
  const { sortSelect, sortValue } = filter;
  const query = Member.find({ status: "APPLIED" });
  switch (sortSelect) {
    case "rollNumber":
      query.where({ rollNumber: sortValue });
      break;
    default:
      break;
  }
  return await query.exec();
};

module.exports = {
  getMembers,
  getMemberByRollNumber,
  getMemberById,
  addLibraryCardToMember,
  countMemberDocs,
  updateMemberById,
  getMember,
  searchMembers,
  quickSearchMember,
  getLatestMembershipId,
  getApplicationById,
  findApplications,
};
