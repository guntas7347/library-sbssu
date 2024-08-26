import fileDownload from "js-file-download";
import { ip1, ip2, localIp } from "../../http-requests";

const API_URL = `http://${localIp ? ip1 : ip2}:8080/api/staff`;

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

export const restCall = (url, obj, crs = [], blob = false) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/${url}`, postOptions(obj))
      .then(async (res) => {
        if (!Array.isArray(crs)) crs = [crs];
        if (crs.length === 0) {
          reject(`CRS UNDEFINED at ${url}`);
          return;
        }

        if (blob) {
          const contentDisposition = res.headers.get("Content-Disposition");
          const fileName = contentDisposition
            .split("filename=")[1]
            .replace(/^"|"$/g, "");

          fileDownload(await res.blob(), fileName);
          resolve("File Downloaded Successfully");
          return;
        }

        const response = await res.json();
        if (crs.includes(response.status)) {
          if (response.payload === null) {
            resolve(response.message);
          } else {
            resolve(response.payload);
          }
        } else {
          logResponseToConsole(response, false);
          reject(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (blob) {
          reject("Download Failed");
          return;
        }
        reject("Could not connect to Server");
      });
  });
};

export const createNewStudent = (obj) =>
  restCall("students/create-new-student", obj, ["STU201CNS"]);

export const editExistingStudent = (obj) =>
  restCall("students/edit-existing-student", obj, ["STU200ES"]);

export const fetchStudentByRollNumber = (rollNumber) =>
  restCall("students/fetch-student-by-roll-number", { rollNumber }, [
    "STU200FSBRN",
  ]);

export const allotLibraryCardToStudent = ({ rollNumber, cardNumber }) =>
  restCall(
    "students/allot-library-card-to-student",
    { rollNumber, cardNumber },
    ["STU200ALCTS"]
  );

export const fetchAllStudents = (filter) =>
  restCall("students/fetch-all-students", filter, ["STU200FAS"]);

export const fetchAllApplications = (filter) =>
  restCall("students/fetch-all-applications", filter, "STU200FAA");

export const fetchOneApplication = (_id) =>
  restCall("students/fetch-one-application", { _id }, "APP200FA");

export const processApplication = (decision) =>
  restCall("students/process-application", decision, [
    "APP200APA",
    "APP200RPA",
  ]);

export const addNewBook = (bookDetails) =>
  restCall("/books/add-new-book", bookDetails, "BKS200ANB");

export const fetchAllBooks = (filter) =>
  restCall("books/fetch-all-books", filter, "BKS200FAB");

export const fetchBookByISBN = (isbn) =>
  restCall("books/fetch-book-by-isbn", { isbn }, "BKS200FBBI");

export const createBookAccession = (bookAccessionDetails) =>
  restCall("books/add-book-accession", bookAccessionDetails, "BKS200ABA");

export const fetchBookDetails = (_id) =>
  restCall("books/fetch-book-by-id", { _id }, "BKS200FBDBI");

export const editExistingBook = (e) =>
  restCall("books/edit-existing-book", e, "BKS200EB");

export const fetchBookByAccessionNumber = (accessionNumber) =>
  restCall(
    "books/fetch-book-by-accession-number",
    { accessionNumber },
    "BKS200FBBAN"
  );

export const fetchStudentById = (_id) =>
  restCall("students/fetch-student-by-id", { _id }, "STU200FSBI");

export const issueNewBook = (issueBookDetails) =>
  restCall("books/issue-books/issue-new-book", issueBookDetails, "ISB200INB");

export const fetchIssuedBookByAccessionNumber = (accessionNumber) =>
  restCall(
    "books/issue-books/fetch-issued-book-by-accession-number",
    { accessionNumber },
    "ISB200FIBBAN"
  );

export const returnIssuedBook = (returningBookDetails) =>
  restCall(
    "books/return-books/return-issued-book",
    returningBookDetails,
    "ISB200RIB"
  );

export const issueBookFine = (returningBookDetails) =>
  restCall(
    "books/issue-books/calculate-issue-book-fine",
    returningBookDetails,
    "ISB200CIBF"
  );

export const fetchAllFines = (filter) =>
  restCall("fines/fetch-all-fines", filter, "FIN200FAF");

export const fetchFineById = (_id) =>
  restCall("fines/fetch-fine-doc", { _id }, "FIN200FFBI");

export const addRecieptNumber = (data) =>
  restCall("fines/add-reciept-number", data, "FIN200ARN");

export const fetchAllIssuedBooks = (filter) =>
  restCall("books/issue-books/fetch-all-issued-books", filter, "ISB200FAIB");

export const downloadAllIssuedBooks = (filter) =>
  restCall("books/issue-books/download-all-issued-books", filter, "", true);

export const fetchAllReturnedBooks = (filter) =>
  restCall("books/return-books/fetch-all-returned-books", filter, "ISB200FARB");

export const downloadAllReturnedBooks = (filter) =>
  restCall("books/return-books/download-all-returned-books", filter, "", true);

export const fetchReturnedBook = (_id) =>
  restCall("books/return-books/fetch-returned-book", { _id }, "ISB200FRB");

export const fetchIssuedBook = (_id) =>
  restCall("books/issue-books/fetch-issued-book", { _id }, "ISB200FIB");

export const createNewStaff = (staff) =>
  restCall("staff/create-new-staff", staff, ["AUTH200AADM"]);

export const fetchAllStaff = (filter) =>
  restCall("staff/search-all-staff", filter, ["STF200FAS"]);

export const fetchStaffById = (_id) =>
  restCall("staff/fetch-staff-by-id", { _id }, ["STF200FSBI"]);

export const db_fetchIssuedBookDoc = (_id) =>
  restCall("database/get-issued-book", { _id }, "DBSF200ISB");

export const getNumberOfIssuedBooks = (filter = null) =>
  restCall("books/issue-books/count-issued-books", { filter }, "ISB200CIBD");

export const getNumberOfReturnedBooks = (filter = null) =>
  restCall("books/return-books/count-returned-books", { filter }, "REB200CRBD");

export const getNumberOfBookAccessions = () =>
  restCall("books/count-book-accessions", {}, "BKS200CTBA");

export const getNumberOfStudents = (filter = null) =>
  restCall("students/count-total-students", { filter }, "STU200CTS");

//
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

export const fetchWeather = async () => {
  const API_KEY = "3dce05be7c8e1bebc039ccd19cadcc54";
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=30.914519&lon=74.652159&appid=${API_KEY}`
    )
      .then(async (res) => {
        const weather = await res.json();
        const { main } = weather;
        resolve((main.temp - 273.15).toFixed(1));
      })
      .catch(() => resolve("Unable to Fetch"));
  });
};
