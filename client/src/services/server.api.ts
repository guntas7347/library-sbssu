import { MemberData } from "../types/issue";
import { restCall } from "../utils/rest-call";

const server = {
  auth: {
    ping: (e) => restCall("auth/ping", e, "AUTH_200_PING_SUCCESS"),
    login: (e) => restCall("auth/login", e, "AUTH_200_LOGIN_SUCCESS"),
    clearSession: () =>
      restCall("auth/clear-session", null, "AUTH_200_SESSION_CLEARED"),
    forgotPassword: (e) =>
      restCall("auth/forgot-password", e, "AUTH_200_PASSWORD_RESET_SENT"),
    verifyLink: (e) =>
      restCall("auth/verify-reset-link", e, "AUTH_200_LINK_VERIFIED"),
    resetPassword: (e) =>
      restCall("auth/reset-password", e, "AUTH_200_PASSWORD_RESET_SUCCESS"),
    signOut: () => restCall("auth/sign-out", null, "AUTH_200_SIGNOUT_SUCCESS"),
  },

  application: {
    create: (e) =>
      restCall(
        "public/application/create",
        e,
        "PUBLIC_201_APPLICATION_CREATED"
      ),
    publicFetch: (e) =>
      restCall("public/application/fetch", e, "PUBLIC_200_APPLICATION_FETCHED"),
    delete: (e) =>
      restCall(
        "public/application/delete",
        e,
        "PUBLIC_200_APPLICATION_DELETED"
      ),
    fetch: (id) =>
      restCall(
        `staff/application/one?id=${id}`,
        null,
        "APPLICATION_200_FETCHED"
      ),
    fetchAll: (e) =>
      restCall(`staff/application/all?${e}`, null, "APPLICATION_200_SEARCHED"),
    process: (e) =>
      restCall("staff/application/process", e, [
        "APPLICATION_200_APPROVED",
        "APPLICATION_200_REJECTED",
      ]),
  },

  member: {
    fetchAll: (e) =>
      restCall(`staff/member/all?${e}`, null, "MEMBER_200_ALL_FETCHED"),
    fetch: (e) =>
      restCall(`staff/member/one?id=${e}`, null, "MEMBER_200_FETCHED"),
    fetchForAllot: (e) =>
      restCall(`staff/member/allot-data?id=${e}`, null, "MEMBER_200_FETCHED"),
    fetchForEdit: (e) =>
      restCall(`staff/member/for-edit?id=${e}`, null, "MEMBER_200_FETCHED"),
    fetchCards: (e) =>
      restCall(`staff/member/cards?id=${e}`, null, "MEMBER_200_CARDS_FETCHED"),
    search: (e) =>
      restCall(
        `staff/member/search?searchTerm=${e}`,
        null,
        "MEMBER_200_ALL_FETCHED"
      ),
    allotCard: (e) =>
      restCall("staff/member/allot-card", e, "MEMBER_200_CARD_ALLOTED"),
    update: (e) => restCall("staff/member/update", e, "MEMBER_200_UPDATED"),
    updateCardStatus: (e) =>
      restCall("staff/member/card-status", e, "MEMBER_200_CARD_UPDATED"),
    issueNoDue: (id) =>
      restCall("staff/member/issue-no-due", { id }, "MEMBER_200_NO_DUE_SLIP"),
  },

  issue: {
    member: (e) =>
      restCall<MemberData>(
        `staff/issue/member?number=${e}`,
        null,
        "ISSUE_200_MEMBER_FETCHED"
      ),
    book: (e) =>
      restCall(`staff/issue/book?number=${e}`, null, "ISSUE_200_BOOK_FETCHED"),
    issue: (e) => restCall("staff/issue/issue", e, "ISSUE_201_BOOK_ISSUED"),
    search: (e) =>
      restCall(`staff/issue/all?${e}`, null, "ISSUE_200_ALL_FETCHED"),
    fetch: (e) =>
      restCall(`staff/issue/one?id=${e}`, null, "ISSUE_200_BOOK_FETCHED"),
    bulkReminder: (e) =>
      restCall("staff/issue/bulk-remind", null, "ISSUE_201_BOOK_ISSUED"),
  },

  return: {
    fetch: (e) =>
      restCall(`staff/return/fetch?number=${e}`, null, "RETURN_200_FETCHED"),
    return: (e) => restCall("staff/return/return", e, "RETURN_201_BOOK_ISSUED"),
    search: (e) =>
      restCall(`staff/return/all?${e}`, null, "RETURN_200_FETCHED"),
    fetchReturn: (e) =>
      restCall(`staff/return/one?id=${e}`, null, "RETURN_200_FETCHED"),
  },

  transaction: {
    search: (e) =>
      restCall(
        `staff/transaction/all?${e}`,
        null,
        "TRANSACTION_200_ALL_FETCHED"
      ),
    fetch: (e) =>
      restCall(
        `staff/transaction/one?id=${e}`,
        null,
        "TRANSACTION_200_ALL_FETCHED"
      ),
    create: (e) =>
      restCall("staff/transaction/create", e, "TRANSACTION_201_CREATED"),
  },

  book: {
    fetchAll: (e) =>
      restCall(`staff/book/all?${e}`, null, "BOOK_200_ALL_FETCHED"),
    fetch: (e) => restCall(`staff/book/one?id=${e}`, null, "BOOK_200_FETCHED"),
    create: (e) => restCall("staff/book/create", e, "BOOK_200_CREATED"),
    update: (e) => restCall("staff/book/update", e, "BOOK_200_UPDATED"),
  },

  settings: {
    fetchSetting: (e: string) =>
      restCall(`staff/setting/fetch?key=${e}`, null, "SETTINGS_200_FETCHED"),
    updateSetting: (e) =>
      restCall("staff/setting/update", e, "SETTINGS_200_UPDATED"),
  },

  staff: {
    fetchAll: (e) =>
      restCall(`staff/staff/all?${e}`, null, "STAFF_200_ALL_FETCHED"),
    fetch: (id) =>
      restCall(`staff/staff/one?id=${id}`, null, "STAFF_200_FETCHED"),
    fetchForEdit: (id) =>
      restCall(`staff/staff/edit?id=${id}`, null, "STAFF_200_FETCHED"),
    fetchProfile: () =>
      restCall("staff/staff/profile", null, "STAFF_200_FETCHED"),
    create: (e) => restCall("staff/staff/create", e, "STAFF_201_CREATED"),
    update: (e) => restCall("staff/staff/update", e, "STAFF_200_UPDATED"),
  },

  stats: () => restCall(`staff/stats`, null, "STATS_200_FETCHED"),
  public: {
    settings: () =>
      restCall(
        "public/settings/application",
        null,
        "PUBLIC_200_SETTINGS_FETCHED"
      ),
    catalogue: (e) =>
      restCall(
        `public/catalogue/search?search=${e}`,
        null,
        "PUBLIC_200_CATALOGUE_FETCHED"
      ),
  },
};

export default server;
