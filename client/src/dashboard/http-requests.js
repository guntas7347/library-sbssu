import { API_URL } from "../keys";

const postOptions = (obj) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(obj),
  };
};

export const restCall = (url, obj, crs = null) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/${url}`, postOptions(obj))
      .then(async (res) => {
        if (!Array.isArray(crs)) crs = [crs];
        if (crs.length === 0) {
          reject(`CRS UNDEFINED at ${url}`);
          return;
        }

        const response = await res.json();
        if (crs.includes(response.status)) {
          resolve(response);
        } else {
          reject(response.message);
        }
      })
      .catch(async () => {
        reject("Could not connect to Server");
      });
  });
};

export const adminLoginWithCredentials = (userCredentials) => {
  return restCall("public/auth/admin/login", userCredentials, "AUTH200ADM");
};

export const createAdminAuth = (userCredentials) => {
  return restCall("public/auth/admin/signup", userCredentials);
};

export const verifyAuthRole = (role) => {
  return restCall("auth-secured/ping", { role }, "AUTH200PING");
};

export const clearSession = () => {
  return restCall("public/auth/clear-session", {}, "AUTH200SOUT");
};

export const signOut = () => {
  return restCall("auth-secured/sign-out", {}, "AUTH200SOUT");
};

export const verifyReCaptcha = (token) =>
  restCall("public/auth/verify-recaptcha", { token }, "AUTH200RECAPTCHA");

export const resetPasswordAdminDispatchLink = (d) =>
  restCall("public/auth/admin/dispatch-reset-link", d, "AUTH200LDPS");

export const resetPasswordAdminVerifyLink = (type, code) =>
  restCall(
    "public/auth/admin/verify-reset-link",
    { type, code },
    "AUTH200LVFS"
  );

export const getPrograms = () =>
  restCall("public/settings/fetch/programs", {}, "SET200GET");

export const createApplication = (e) =>
  restCall("public/member/join", e, "STU201CNA");

export const fetchApplication = (_id, type = "url") =>
  restCall("public/member/fetch", { _id, type }, "STU200FA");

export const deleteApplication = (gh) =>
  restCall("public/member/delete", { gh }, "STU201DA");

export const resetPasswordAdmin = (password, totp, code) =>
  restCall(
    "public/auth/admin/reset-password",
    { password, totp, code },
    "AUTH200RAP"
  );

export const uploadImage = (formData) => {
  return fetch(`${API_URL}/public/upload/upload-image`, {
    method: "POST",
    body: formData,
  });
};
