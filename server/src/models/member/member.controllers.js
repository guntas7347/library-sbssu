const { generateMembershipId } = require("../../utils/functions");
const MEMBER = require("./member.schema");

const createMember = async (memberDetails, session) => {
  return await MEMBER.create(
    [
      {
        ...memberDetails,
        membershipId: generateMembershipId(await getLatestMembershipId()),
      },
    ],
    { session }
  );
};

const getMembers = async (queryParam) => {
  const { filter, filterValue, page = 1 } = queryParam;
  let totalPages = 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const query = MEMBER.find();
  switch (filter) {
    case "fetchAllStudents":
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
  const query = MEMBER.findOne({ rollNumber });

  if (populate) query.populate({ path: "libraryCards", select });

  return await query.exec();
};

const getMember = async (filter) => {
  return await MEMBER.findOne(filter).populate("libraryCards");
};

const getMemberById = async (_id, populate = false, selectLibraryCard) => {
  const query = MEMBER.findById(_id);
  if (populate)
    query.populate({ path: "libraryCards", select: selectLibraryCard });

  return await query.exec();
};

const addLibraryCardToMember = async (_id, libraryCardId, session) => {
  return await MEMBER.findByIdAndUpdate(
    _id,
    {
      $push: { libraryCards: libraryCardId },
    },
    { session }
  );
};

const countMemberDocs = async (filter) => await MEMBER.countDocuments(filter);

const updateMemberById = async (_id, updatedDoc, session) => {
  return await MEMBER.findByIdAndUpdate(_id, updatedDoc, { session });
};

const getLatestMembershipId = async () => {
  const member = await MEMBER.findOne().sort({ membershipId: -1 });
  if (!member) return 200000;
  return member.membershipId;
};

const searchMembers = async (param) => {
  const { search } = param;
  let searchNumber = Number(search);
  if (Number.isNaN(searchNumber)) searchNumber = 0;

  const query = MEMBER.find({
    $or: [
      { fullName: { $regex: search, $options: "i" } },
      { rollNumber: searchNumber },
      { membershipId: searchNumber },
    ],
  });

  query.limit(2).select("_id fullName membershipId");

  return await query.exec();
};

module.exports = {
  createMember,
  getMembers,
  getMemberByRollNumber,
  getMemberById,
  addLibraryCardToMember,
  countMemberDocs,
  updateMemberById,
  getMember,
  searchMembers,
};
