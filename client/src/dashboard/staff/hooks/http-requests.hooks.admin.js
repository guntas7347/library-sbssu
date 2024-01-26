const API_URL = "http://localhost:8080/api/staff";

export const createStudent = (studentDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/students/create-student`, {
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
    fetch(`${API_URL}/students/fetch-all-students`, {
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
    fetch(`${API_URL}/students/fetch-all-applications`, {
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
    fetch(`${API_URL}/students/fetch-one-application`, {
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
    fetch(`${API_URL}/students/process-application`, {
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
    fetch(`${API_URL}/books/add-new-book`, {
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
    fetch(`${API_URL}/books/fetch-all-books`, {
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
          reject({ ...status, statusCode });
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchBookDetails = (book) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/books/fetch-book-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(book),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { payload, status } = await res.json();

        if (statusCode === 200) {
          resolve(payload);
        }
        if (status === "Book not found") {
          resolve(payload);
        } else {
          reject({ ...status, statusCode });
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchBookByISBN = (ISBN) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/books/fetch-book-by-isbn`, {
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

export const createBookAccession = (bookAccessionDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/books/add-book-accession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bookAccessionDetails),
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

export const fetchBookByAccessionNumber = (accessionNumber) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/books/fetch-book-by-accession-number`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(accessionNumber),
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
    fetch(`${API_URL}/students/fetch-student-by-roll-number`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ rollNumber }),
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

export const fetchStudentById = (_id) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/students/fetch-student-by-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ _id }),
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
    fetch(`${API_URL}/students/create-library-card`, {
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
    fetch(`${API_URL}/settings/get-academic-programs`, {})
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
    fetch(`${API_URL}/books/issue-books/issue-new-book`, {
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

export const fetchIssuedBookByAccessionNumber = (bookAccessionNumber) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${API_URL}/books/issue-books/fetch-issued-book-by-accession-number`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookAccessionNumber),
      }
    )
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
    fetch(`${API_URL}/books/issue-books/return-issued-book`, {
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
    fetch(`${API_URL}/books/issue-books/issue-book-fine`, {
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
    fetch(`${API_URL}/books/issue-books/fetch-all-issued-books`, {
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
    fetch(`${API_URL}/books/issue-books/fetch-all-returned-books`, {
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

export const fetchReturnedBook = (_id) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/books/issue-books/fetch-returned-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ _id }),
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

export const fetchIssuedBook = (_id) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/books/issue-books/fetch-issued-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ _id }),
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

export const createNewStaff = (staff) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/staff/create-new-staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(staff),
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

export const fetchAllStaff = (filter) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/staff/search-all-staff`, {
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
