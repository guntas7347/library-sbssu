import fileDownload from "js-file-download";
import { API_URL as API_URL_PRE } from "../../../keys";

const API_URL = API_URL_PRE + "/admin";

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

export const restCall = (url = "", obj = {}, crs = [], blob = false) => {
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
          // logResponseToConsole(response, false);
          reject(response.message);
        }
      })
      .catch(() => {
        if (blob) {
          reject("Download Failed");
          return;
        }
        reject("Could not connect to Server");
      });
  });
};

export const searchGlobally = (query) =>
  restCall(`search?${query && query}`, {}, ["SRH200GLB"]);

export const createNewStudent = (obj) =>
  restCall("members/create-new-student", obj, ["STU201CNS"]);

export const editExistingStudent = (obj) =>
  restCall("members/edit-existing-student", obj, ["STU200ES"]);

export const fetchStudentByRollNumber = (membershipId) =>
  restCall("members/fetch-student-by-roll-number", { membershipId }, [
    "STU200FSBRN",
  ]);

export const fetchMemberForIssue = (membershipId) =>
  restCall("members/fetch-for-issue", { membershipId }, ["STU200FSBRN"]);

export const allotLibraryCardToStudent = (cardDetails) =>
  restCall("members/allot-library-card-to-student", cardDetails, [
    "STU200ALCTS",
  ]);

export const fetchAllStudents = (filter) =>
  restCall("members/fetch-all-members", filter, ["STU200FAS"]);

export const fetchAllApplications = (filter) =>
  restCall("members/fetch-all-applications", filter, "STU200FAA");

export const fetchOneApplication = (_id) =>
  restCall("members/fetch-one-application", { _id }, "APP200FA");

export const processApplication = (decision) =>
  restCall("members/process-application", decision, ["APP200APA", "APP200RPA"]);

export const quickAddBook = (bookDetails) =>
  restCall("/books/quick-add", bookDetails, "BKS200ABA");

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

export const fetchBookForIssue = (accessionNumber) =>
  restCall("books/fetch-for-issue", { accessionNumber }, "BKS200FBBAN");

export const fetchStudentById = (_id) =>
  restCall("members/fetch-student-by-id", { _id }, "STU200FSBI");

export const quickSearchMember = (query) =>
  restCall("members/quick-search", query, ["SRH200GLB"]);

export const markInactive = (_id) =>
  restCall("members/mark-inactive", { _id }, "MEB200MI");

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

export const fetchTransactions = (filter) =>
  restCall("transactions/fetch-transactions", filter, ["TRN200FT"]);

export const fetchTransaction = (_id) =>
  restCall("transactions/fetch-transaction", { _id }, ["TRN200FTBI"]);

export const fetchAllFines = (query) =>
  restCall(`fines/fetch-all-fines?${query && query}`, {}, "FIN200FAF");

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

export const fetchAllStaff = (filter) =>
  restCall("staff/search-all-staff", filter, ["STF200FAS"]);

export const fetchStaffById = (_id) =>
  restCall("staff/fetch-staff-by-id", { _id }, ["STF200FSBI"]);

export const fetchProfile = () =>
  restCall("staff/fetch-profile", {}, ["STF200FSBI"]);

export const editStaff = (_id, update) =>
  restCall("staff/edit-staff", { _id, update }, ["STF201ESDI"]);

export const db_fetchIssuedBookDoc = (_id) =>
  restCall("database/get-issued-book", { _id }, "DBSF200ISB");

export const getNumberOfIssuedBooks = (filter = null) =>
  restCall("books/issue-books/count-issued-books", { filter }, "ISB200CIBD");

export const getNumberOfReturnedBooks = (filter = null) =>
  restCall("books/return-books/count-returned-books", { filter }, "REB200CRBD");

export const getNumberOfBookAccessions = () =>
  restCall("books/count-book-accessions", {}, "BKS200CTBA");

export const getNumberOfStudents = (filter = null) =>
  restCall("members/count-total-members", { filter }, "STU200CTS");

//

// export const fetchBookDetailsByIsbnApi = (isbn) => {
//   return new Promise((resolve, reject) => {
//     fetch(`https://openlibrary.org/isbn/${isbn}.json`, {})
//       .then(async (res) => {
//         const statusCode = res.status;
//         const body = await res.json();
//         if (statusCode === 200) {
//           resolve(body);
//           console.log(body);
//         } else {
//           resolve({ title: "", publish_date: "", publishers: [""] });
//         }
//       })
//       .catch((error) =>
//         resolve({ title: "", publish_date: "", publishers: [""] })
//       );
//   });
// };

// export const fetchWeather = async () => {
//   return new Promise((resolve) => {
//     fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=30.914519&lon=74.652159&appid=${OPEN_WEATHER_API_KEY}`
//     )
//       .then(async (res) => {
//         const weather = await res.json();
//         const otherResults = weather.weather[0];
//         const result = {
//           temp: (weather.main.temp - 273.15).toFixed(1),
//           feels_like: (weather.main.feels_like - 273.15).toFixed(1),
//           description: otherResults.description,
//           icon: otherResults.icon,
//           city: weather.name,
//         };

//         resolve(result);
//       })
//       .catch((err) => {
//         console.log(err);
//         resolve("Unable to Fetch");
//       });
//   });
// };

const server = {
  book: {
    addNewBook: (book) => restCall("books/create", { book }, "BKS200ANB"),
    fetchForAddAccession: (accessionNumber) =>
      restCall("books/fetch/add-accession", { accessionNumber }, "BKS200FBBI"),
    addAccessions: (e) => restCall("books/accession/create", e, "BKS200ABA"),
  },
  member: {
    fetchStudentById: (_id) =>
      restCall("members/fetch-student-by-id", { _id }, "STU200FSBI"),
    quickSearchMember: (query) =>
      restCall("members/quick-search", query, ["SRH200GLB"]),
    markInactive: (_id) =>
      restCall("members/mark-inactive", { _id }, "MEB200MI"),
  },
  transactions: {
    fetchMember: (membershipId) =>
      restCall("transactions/fetch-member", { membershipId }, ["TRN200FM"]),
    addTransaction: (param) =>
      restCall("transactions/add-transaction", param, ["TRN200AT"]),
  },
  settings: {
    fetchSetting: (e) => restCall("settings/fetch", { key: e }, "SET200GET"),
    updateSetting: (e) => restCall("settings/update", e, "SET200UPD"),
  },
  staff: {
    create: (e) => restCall("staff/create", e, ["AUTH200AADM"]),
  },
};

export default server;
