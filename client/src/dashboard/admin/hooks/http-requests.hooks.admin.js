const API_URL = "http://localhost:8080";

export const createStudent = (studentDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/students/create-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(studentDetails),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { success, status } = await res.json();

        if (success) {
          resolve(status);
        } else {
          console.error(status);
          if (statusCode === 500) {
            if (status._message) {
              reject(status._message);
            }
            reject("Unknow Error, Check console log for more info...");
          }
          reject(status);
        }
      })
      .catch((error) => {
        console.log(error);
        reject("Unknow Error, Check console log for more info...");
      });
  });
};

export const fetchAllStudents = (filter) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/students/fetch-all-students`, {
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
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchAllApplications = (filter) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/students/fetch-all-applications`, {
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
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchOneApplication = (applicationNumber) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/students/fetch-one-application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(applicationNumber),
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

export const processApplication = (applicationDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/students/process-application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(applicationDetails),
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

export const addNewBook = (bookDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/books/add-new-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bookDetails),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { success, status, payload } = await res.json();

        if (success) {
          resolve(status);
        } else {
          console.error(status, payload);
          if (statusCode === 500) {
            if (payload._message) {
              reject(payload._message);
            }
            reject("Unknow Error, Check console log for more info...");
          }
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchAllBooks = (filter) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/books/fetch-all-books`, {
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
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchBookByISBN = (ISBN) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/books/fetch-book-by-isbn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(ISBN),
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

export const createBookAccount = (bookAccountDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/books/add-book-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bookAccountDetails),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { status } = await res.json();

        if (statusCode === 200) {
          resolve(status);
        } else {
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchBookByAccountNumber = (accountNumber) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/books/fetch-book-by-account-number`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(accountNumber),
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

export const fetchStudentByRollNumber = (rollNumber) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/students/fetch-student-by-roll-number`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(rollNumber),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { status, payload } = await res.json();
        if (statusCode === 200) {
          resolve(payload);
        } else {
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const createLibraryCard = (LibraryCardDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/students/create-library-card`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(LibraryCardDetails),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { success, status } = await res.json();

        if (success) {
          resolve(status);
        } else {
          console.error(status);
          if (statusCode === 500) {
            if (status._message) {
              reject(status._message);
            }
            reject("Unknow Error, Check console log for more info...");
          }
          reject(status);
        }
      })
      .catch((error) => {
        console.log(error);
        reject("Unknow Error, Check console log for more info...");
      });
  });
};

export const fetchSettingsAcademicPrograms = () => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/settings/get-academic-programs`, {})
      .then(async (res) => {
        const statusCode = res.status;
        const { data } = await res.json();
        if (statusCode === 200) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchBookDetailsByIsbnApi = (isbn) => {
  return new Promise((resolve, reject) => {
    fetch(`https://openlibrary.org/isbn/${isbn}.json`, {})
      .then(async (res) => {
        const statusCode = res.status;
        const body = await res.json();
        if (statusCode === 200) {
          resolve(body);
          console.log(body);
        } else {
          resolve({ title: "", publish_date: "", publishers: [""] });
        }
      })
      .catch((error) =>
        resolve({ title: "", publish_date: "", publishers: [""] })
      );
  });
};

export const issueNewBook = (issueBookDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/books/issue-books/issue-new-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(issueBookDetails),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { status } = await res.json();

        if (statusCode === 200) {
          resolve(status);
        } else {
          reject(status);
        }
      })
      .catch(async (error) => reject(error));
  });
};

export const fetchIssuedBook = (bookAccountNumber) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/books/issue-books/fetch-issued-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bookAccountNumber),
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

export const returnIssuedBook = (returningBookDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/books/issue-books/return-issued-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(returningBookDetails),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { status } = await res.json();

        if (statusCode === 200) {
          resolve(status);
        } else {
          reject(status);
        }
      })
      .catch(async (error) => reject(error));
  });
};
export const issueBookFine = (returningBookDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/books/issue-books/issue-book-fine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(returningBookDetails),
    })
      .then(async (res) => {
        // const statusCode = res.status;
        const { payload, status } = await res.json();

        switch (status) {
          case "No Fine":
            resolve(payload);
            break;
          case "Fine":
            resolve(payload);
            break;
          case "Invalid Issued Book":
            reject(status);
            break;
          default:
            reject(status);
            break;
        }
      })
      .catch(async (error) => reject(error));
  });
};

export const fetchAllIssuedBooks = (filter) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/books/issue-books/fetch-all-issued-books`, {
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
          reject(status);
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchAllReturnedBooks = (filter) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/books/issue-books/fetch-all-returned-books`, {
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
