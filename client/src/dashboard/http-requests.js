export const localIp = true;

export const ip1 = "localhost";
export const ip2 = "https://9f4f-38-137-46-9.ngrok-free.app/";

const API_URL = `http://${localIp ? ip1 : ip2}:8080/api`;

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
          console.log(response.status);
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

export const initalizeSignUpWithCredentials = (userCredentials) => {
  return restCall(
    "auth/applicants/create-user/send-otp",
    userCredentials,
    "AUTH200SAPP"
  );
};

export const compleateSignUpWithCredentials = (userCredentials) => {
  return restCall(
    "auth/applicants/create-user/verify-otp",
    userCredentials,
    "AUTH200VAPP"
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

export const changePassword = (credentials) => {
  return restCall(
    "auth-secured/admin/change-password",
    credentials,
    "AUTH200CAP"
  );
};

export const resetPasswordAdminSendOtp = (email) =>
  restCall("auth/admin/reset-password-init", { email }, "AUTH200RAPI");

export const resetPasswordAdminVerifyOtp = (cred) =>
  restCall("auth/admin/reset-password-verify", cred, "AUTH200RAPV");

export const resetPasswordAdmin = (cred) =>
  restCall("auth/admin/reset-password", cred, "AUTH200RAP");

export const verifyReCaptcha = (token) =>
  restCall("auth/verify-recaptcha", { token }, "AUTH200RECAPTCHA");
