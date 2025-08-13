import { Router } from "express";
import { authorisationLevel } from "../../../middlewares/auth/auth.middlewares.js";
import { findMembersHandler } from "../../../middlewares/member/findMembers.js";
import { fetchMemberProfileHandler } from "../../../middlewares/member/fetchMemberProfile.js";
import { searchMembersHandler } from "../../../middlewares/member/searchMembers.js";
import { fetchMemberForAllotHandler } from "../../../middlewares/member/fetchMemberForAllot.js";
import validateRequest from "../../../middlewares/validateRequest.js";
import { AllotCardSchema } from "../../../schema/member/AllotCardSchema.js";
import { allotNewCardHandler } from "../../../middlewares/member/allotNewCard.js";
import { findLibraryCardsHandler } from "../../../middlewares/member/findLibraryCards.js";
import validate from "../../../middlewares/validateRequest.js";
import idSchema from "../../../schema/common/idSchema.js";
import { findMembersSchema } from "../../../schema/member/findMembersSchema.js";
import searchSchema from "../../../schema/member/searchSchema.js";
import { fetchMemberForEditHandler } from "../../../middlewares/member/fetchMemberForEdit.js";
import { updateMemberSchema } from "../../../schema/member/updateMemberSchema.js";
import { updateMemberHandler } from "../../../middlewares/member/updateMemberHandler.js";
import { updateCardStatusSchema } from "../../../schema/member/updateCardStatusSchema.js";
import { updateCardStatusHandler } from "../../../middlewares/member/updateCardStatus.js";
import { issueNoDueHandler } from "../../../middlewares/member/issueNoDue.js";

const memberRouter = Router();

memberRouter.get(
  "/all",
  authorisationLevel(["view_members"]),
  validate(findMembersSchema),
  findMembersHandler
); //fetch-all-members

memberRouter.get(
  "/one",
  authorisationLevel(["view_members"]),
  validate(idSchema),
  fetchMemberProfileHandler
); // fetch one

memberRouter.get(
  "/cards",
  authorisationLevel(["view_members"]),
  validate(idSchema),
  findLibraryCardsHandler
);

memberRouter.get(
  "/for-edit",
  authorisationLevel(["view_members"]),
  validate(idSchema),
  fetchMemberForEditHandler
);

memberRouter.post(
  "/update",
  authorisationLevel(["edit_members"]),
  validate(updateMemberSchema),
  updateMemberHandler
);

memberRouter.get("/search", validate(searchSchema), searchMembersHandler);

memberRouter.get("/allot-data", validate(idSchema), fetchMemberForAllotHandler);

memberRouter.post(
  "/allot-card",
  authorisationLevel(["allot_cards"]),
  validateRequest(AllotCardSchema),
  allotNewCardHandler
);

memberRouter.post(
  "/card-status",
  authorisationLevel(["manage_card_status"]),
  validateRequest(updateCardStatusSchema),
  updateCardStatusHandler
);

memberRouter.post(
  "/issue-no-due",
  authorisationLevel(["issue_no_due"]),
  validate(idSchema),
  issueNoDueHandler
);

export default memberRouter;
