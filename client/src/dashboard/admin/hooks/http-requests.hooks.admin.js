const API_URL = "http://localhost:8080";

export const createStudent = (studentDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/students/create-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentDetails),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const body = await res.json();

        if (statusCode === 200) {
          resolve(body);
        } else {
          reject(body);
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchAllStudents = () => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/students/fetch-all-students`, {})
      .then(async (res) => {
        const statusCode = res.status;
        const { message } = await res.json();

        if (statusCode === 200) {
          resolve(message);
        } else {
          reject(message);
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
      body: JSON.stringify(bookDetails),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const body = await res.json();

        if (statusCode === 200) {
          resolve(body);
        } else {
          reject(body);
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchAllBooks = () => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/books/fetch-all-books`, {})
      .then(async (res) => {
        const statusCode = res.status;
        const { message } = await res.json();

        if (statusCode === 200) {
          resolve(message);
        } else {
          reject(message);
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
      body: JSON.stringify(ISBN),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { message } = await res.json();

        if (statusCode === 200) {
          resolve(message);
        } else {
          reject(message);
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
      body: JSON.stringify(bookAccountDetails),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { message } = await res.json();

        if (statusCode === 200) {
          resolve(message);
        } else {
          reject(message);
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
      body: JSON.stringify(accountNumber),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { message } = await res.json();

        if (statusCode === 200) {
          resolve(message);
        } else {
          reject(message);
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
      body: JSON.stringify(rollNumber),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { message } = await res.json();

        if (statusCode === 200) {
          resolve(message);
        } else {
          reject(message);
        }
      })
      .catch((error) => reject(error));
  });
};

export const createStudentCard = (StudentCardDetails) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/students/create-student-card`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(StudentCardDetails),
    })
      .then(async (res) => {
        const statusCode = res.status;
        const { message } = await res.json();

        if (statusCode === 200) {
          resolve(message);
        } else {
          reject(message);
        }
      })
      .catch((error) => reject(error));
  });
};

export const fetchSettingsAcademicPrograms = () => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/api/admin/settings/get-academic-programs`, {})
      .then(async (res) => {
        const statusCode = res.status;
        const { message } = await res.json();
        if (statusCode === 200) {
          resolve(message);
        } else {
          reject(message);
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
          console.log(body.authors[0].key);
          fetch(`https://openlibrary.org${body.authors[0].key}.json`)
            .then(async (res) => {
              const { name } = await res.json();

              resolve({ ...body, author: name });
            })
            .catch();
        } else {
          reject(body);
        }
      })
      .catch((error) => reject(error));
  });
};
