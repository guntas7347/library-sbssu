const API_URL = "http://localhost:8080";

export const loginWithCredentials = (userCredentials) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/auth/admin/email-sign-on/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userCredentials),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { payload, status } = await res.json();

        if (statusCode === 200) {
          resolve(status);
        } else {
          console.error(payload);
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const adminLoginWithCredentials = (userCredentials) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/auth/admin/email-sign-on/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userCredentials),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { payload, status } = await res.json();

        if (statusCode === 200) {
          resolve(status);
        } else {
          console.error(payload);
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const initalizeSignUpWithCredentials = (userCredentials) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/auth/applicants/email-sign-on/create-user/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userCredentials),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { payload, status } = await res.json();

        if (statusCode === 200) {
          resolve({ status, payload });
        } else {
          console.error(payload);
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const compleateSignUpWithCredentials = (userCredentials) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${API_URL}/api/auth/applicants/email-sign-on/create-user/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userCredentials),
      }
    )
      .then(async (res) => {
        const statusCode = res.status;
        const { payload, status } = await res.json();

        if (statusCode === 200) {
          resolve(status);
        } else {
          console.error(payload);
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const createApplication = (applicantionDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/applicant/create-new-application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(applicantionDetails),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { payload, status } = await res.json();

        if (statusCode === 200) {
          resolve(payload);
        } else {
          console.error(payload);
          reject(payload);
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchApplication = () => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/applicant/get-application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { payload, status } = await res.json();

        if (statusCode === 200) {
          resolve(payload);
        } else {
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/auth/email-sign-on/sign-out`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { payload, status } = await res.json();

        if (statusCode === 200) {
          resolve(status);
        } else {
          console.error(payload);
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const verifyAuthRole = (role) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/auth/ping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(role),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { payload, status } = await res.json();

        if (statusCode === 200) {
          resolve(status);
        } else {
          console.error(payload);
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const changePassword = (credentials) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { payload, status } = await res.json();

        if (statusCode === 200) {
          resolve(status);
        } else {
          console.error(payload);
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const forgotPassword = (credentials) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { payload, status } = await res.json();

        if (statusCode === 200) {
          resolve(status);
        } else {
          console.error(payload);
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};
