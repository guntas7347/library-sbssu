const API_URL = "http://localhost:8080";

export const fetchIssueHistory = (filter) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/student/issue-history/fetch-issued-history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(filter),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { payload, status } = await res.json();

        if (statusCode === 200) {
          resolve(payload);
        } else {
          console.error(payload);
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};
