export const localIp = true;

export const ip1 = "localhost";
export const ip2 = "192.168.1.9";

const API_URL_old = `http://${localIp ? ip1 : ip2}:8080/api`;
const API_URL = "/api";

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
          logResponseToConsole(response, false);
          reject(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
        reject("Could not connect to Server");
      });
  });
};

export const adminLoginWithCredentials = (userCredentials) => {
  return restCall("auth/admin/login", userCredentials, "AUTH200ADM");
};

export const studentLoginWithCredentials = (userCredentials) => {
  return restCall("auth/students/login", userCredentials, ["AUTH200STU"]);
};

export const applicantLoginWithCredentials = (userCredentials) => {
  return restCall("auth/applicants/login", userCredentials, "AUTH200LAPP");
};

export const createAdminAuth = (userCredentials) => {
  return restCall("auth/admin/signup", userCredentials);
};

export const createAuthApplicant = (userCredentials) => {
  return restCall(
    "auth/applicants/create-user",
    userCredentials,
    "AUTH200SAPP"
  );
};

export const createApplication = (applicantionDetails) => {
  return restCall(
    "applicant/create-new-application",
    applicantionDetails,
    "APP200CNA"
  );
};

export const fetchApplication = () => {
  return restCall("applicant/get-application", {}, "APP200FA");
};

export const deleteApplication = () => {
  return restCall("applicant/delete-application", {}, "APP200DA");
};

export const verifyAuthRole = (role) => {
  return restCall("auth-secured/ping", { role }, "AUTH200PING");
};

export const signOut = () => {
  return restCall("auth/sign-out", {}, "AUTH200SOUT");
};

export const verifyReCaptcha = (token) =>
  restCall("auth/verify-recaptcha", { token }, "AUTH200RECAPTCHA");

export const resetPasswordApplicantDispatchLink = (email) =>
  restCall("auth/applicants/dispatch-reset-link", { email }, "AUTH200LDPS");

export const resetPasswordApplicantVerifyLink = (type, code) =>
  restCall("auth/applicants/verify-reset-link", { type, code }, "AUTH200LVFS");

export const resetPasswordApplicant = (password, code) =>
  restCall("auth/applicants/reset-password", { password, code }, "AUTH200RAP");

export const resetPasswordStudentDispatchLink = (email) =>
  restCall("auth/students/dispatch-reset-link", { email }, "AUTH200LDPS");

export const resetPasswordStudentVerifyLink = (type, code) =>
  restCall("auth/students/verify-reset-link", { type, code }, "AUTH200LVFS");

export const resetPasswordStudent = (password, code) =>
  restCall("auth/students/reset-password", { password, code }, "AUTH200RAP");

export const resetPasswordAdminDispatchLink = (email) =>
  restCall("auth/admin/dispatch-reset-link", { email }, "AUTH200LDPS");

export const resetPasswordAdminVerifyLink = (type, code) =>
  restCall("auth/admin/verify-reset-link", { type, code }, "AUTH200LVFS");

export const resetPasswordAdmin = (password, code) =>
  restCall("auth/admin/reset-password", { password, code }, "AUTH200RAP");

export const deleteImageFromCloud = (imageData) => {
  return restCall("upload/delete-image", imageData, "ULD200DELIMG");
};
