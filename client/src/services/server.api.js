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
      restCall("staff/application/process", e, "APPLICATION_200_APPROVED"),
  },

  member: {
    fetchAll: (e) =>
      restCall(`staff/member/all?${e}`, null, "MEMBER_200_ALL_FETCHED"),
    fetch: (e) =>
      restCall(`staff/member/one?id=${e}`, null, "MEMBER_200_FETCHED"),
  },

  settings: {
    fetchSetting: (e) =>
      restCall("staff/settings/fetch", { key: e }, "SETTINGS_200_FETCHED"),
    updateSetting: (e) =>
      restCall("staff/settings/update", e, "SETTINGS_200_UPDATED"),
  },

  staff: {
    fetchAll: (e) =>
      restCall(`staff/staff/all?${e}`, null, "STAFF_200_ALL_FETCHED"),
    fetch: (id) =>
      restCall(`staff/staff/one?id=${id}`, null, "STAFF_200_FETCHED"),
  },

  public: {
    getPrograms: () =>
      restCall("public/settings/programs", null, "PUBLIC_200_PROGRAMS_FETCHED"),
  },
};

export default server;
