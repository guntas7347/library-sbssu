import { API_URL } from "../keys";

const logResponseToConsole = ({ status, message, payload }, success = true) =>
  success
    ? console.log({ status, message, payload })
    : console.error({ status, message, payload });

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
          // logResponseToConsole(response, false);
          reject(response.message);
        }
      })
      .catch(async () => {
        reject("Could not connect to Server");
      });
  });
};

export const adminLoginWithCredentials = (userCredentials) => {
  return restCall("auth/admin/login", userCredentials, "AUTH200ADM");
};

export const createAdminAuth = (userCredentials) => {
  return restCall("auth/admin/signup", userCredentials);
};

export const verifyAuthRole = (role) => {
  return restCall("auth-secured/ping", { role }, "AUTH200PING");
};

export const signOut = () => {
  return restCall("auth/sign-out", {}, "AUTH200SOUT");
};

export const verifyReCaptcha = (token) =>
  restCall("auth/verify-recaptcha", { token }, "AUTH200RECAPTCHA");

export const resetPasswordAdminDispatchLink = (d) =>
  restCall("auth/admin/dispatch-reset-link", d, "AUTH200LDPS");

export const resetPasswordAdminVerifyLink = (type, code) =>
  restCall("auth/admin/verify-reset-link", { type, code }, "AUTH200LVFS");

export const resetPasswordAdmin = (password, code) =>
  restCall("auth/admin/reset-password", { password, code }, "AUTH200RAP");

export const deleteImageFromCloud = (imageData) => {
  return restCall("upload/delete-image", imageData, "ULD200DELIMG");
};
