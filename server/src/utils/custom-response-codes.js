const createCustomResponseObject = (status, message, payload = null) => {
  return { status, message, payload };
};

const crs = {
  STU201CNS: (payload = null) =>
    createCustomResponseObject(
      "STU201CNS",
      "Student created successfully",
      payload
    ),
  STU200ES: (payload = null) =>
    createCustomResponseObject(
      "STU200ES",
      "Student Edited successfully",
      payload
    ),
  CONFL409CNS: (payload = null) =>
    createCustomResponseObject(
      "CONFL409CNS",
      "Roll number already exists",
      payload
    ),
  MONGO422CNS: (payload = null) =>
    createCustomResponseObject(
      "MONGO422CNS",
      "Validation failed Please check your input",
      payload
    ),
  SERR500REST: (payload = null) =>
    createCustomResponseObject("SERR500REST", "Internal Server Error", payload),
  STU404FSBRN: (payload = null) =>
    createCustomResponseObject("STU404FSBRN", "Student not found", payload),
  STU200FSBRN: (payload = null) =>
    createCustomResponseObject("STU200FSBRN", "Student found", payload),
  STU409ALCTS: (payload = null) =>
    createCustomResponseObject(
      "STU409ALCTS",
      "Student alread has maximum number of alloted library Cards",
      payload
    ),
  STU4091ALCTS: (payload = null) =>
    createCustomResponseObject(
      "STU4091ALCTS",
      "Card Number already exists",
      payload
    ),
  STU200ALCTS: (payload = null) =>
    createCustomResponseObject(
      "STU200ALCTS",
      "Library Card alloted successfully",
      payload
    ),
  ADM401JWT: (payload = null) =>
    createCustomResponseObject(
      "ADM401JWT",
      "Admin Authentication Failed",
      payload
    ),
  STF401JWT: (payload = null) =>
    createCustomResponseObject(
      "STF401JWT",
      "Staff Authentication Failed",
      payload
    ),
  AUTH401JWT: (payload = null) =>
    createCustomResponseObject(
      "AUTH401JWT",
      "Session expired, Please relogin",
      payload
    ),
  AUTH200SOUT: (payload = null) =>
    createCustomResponseObject("AUTH200SOUT", "Sign Out Successfull", payload),
  AUTH401PING: (payload = null) =>
    createCustomResponseObject("AUTH401PING", "Authentication Failed", payload),
  AUTH200PING: (payload = null) =>
    createCustomResponseObject(
      "AUTH200PING",
      "Authentication Successful",
      payload
    ),
  AUTH200ADM: (payload = null) =>
    createCustomResponseObject("AUTH200ADM", "Admin Login Successful", payload),
  AUTH404ADM: (payload = null) =>
    createCustomResponseObject("AUTH404ADM", "Invalid Email", payload),
  AUTH404STU: (payload = null) =>
    createCustomResponseObject("AUTH404STU", "Invalid Email", payload),
  AUTH200STU: (payload = null) =>
    createCustomResponseObject("AUTH200STU", "Login Successful", payload),
  AUTH401ADM: (payload = null) =>
    createCustomResponseObject("AUTH401ADM", "Invalid Password", payload),
  ERR500JWT: (payload = null) =>
    createCustomResponseObject("ERR500JWT", "Unable to Authenticate", payload),
  STU200FAS: (payload = null) =>
    createCustomResponseObject("STU200FAS", "Students fetched", payload),
  STU200FAA: (payload = null) =>
    createCustomResponseObject("STU200FAA", "Applications fetched", payload),
  BKS409ANB: (payload = null) =>
    createCustomResponseObject("BKS409ANB", "ISBN already exists", payload),
  BKS200ANB: (payload = null) =>
    createCustomResponseObject(
      "BKS200ANB",
      "Book created successfully",
      payload
    ),
  BKS200FAB: (payload = null) =>
    createCustomResponseObject("BKS200FAB", "Books fetched", payload),
  BKS200FBBI: (payload = null) =>
    createCustomResponseObject("BKS200FBBI", "Book fetched", payload),
  BKS404FBBI: (payload = null) =>
    createCustomResponseObject("BKS404FBBI", "Book not found", payload),
  MDW404FBBI: (payload = null) =>
    createCustomResponseObject("MDW404FBBI", "Book not found", payload),
  BKS409ABA: (payload = null) =>
    createCustomResponseObject(
      "BKS409ABA",
      "Accession number already exists",
      payload
    ),
  BKS200ABA: (payload = null) =>
    createCustomResponseObject("BKS200ABA", "Accession number added", payload),
  BKS404FBDBI: (payload = null) =>
    createCustomResponseObject("BKS404FBDBI", "Book not found", payload),
  BKS200FBDBI: (payload = null) =>
    createCustomResponseObject("BKS200FBDBI", "Book found", payload),
  STU404FSBI: (payload = null) =>
    createCustomResponseObject("STU404FSBI", "Student not found", payload),
  STU200FSBI: (payload = null) =>
    createCustomResponseObject("STU200FSBI", "Student found", payload),
  BKS200FBBAN: (payload = null) =>
    createCustomResponseObject("BKS200FBBAN", "Book found", payload),
  MDW404FBBAN: (payload = null) =>
    createCustomResponseObject("MDW404FBBAN", "Book not found", payload),
  MDW409VBAA: (payload = null) =>
    createCustomResponseObject("MDW409VBAA", "Book not available", payload),
  MDW409VLCA: (payload = null) =>
    createCustomResponseObject(
      "MDW409VLCA",
      "Library Card not available",
      payload
    ),
  MDW500SICE: (payload = null) =>
    createCustomResponseObject(
      "MDW500SICE",
      "Book has been Issued but Confirmation Email could not be sent",
      payload
    ),
  MDW500SRCE: (payload = null) =>
    createCustomResponseObject(
      "MDW500SICE",
      "Book has been Returned but Confirmation Email could not be sent",
      payload
    ),
  ISB200RIB: (payload = null) =>
    createCustomResponseObject("ISB200RIB", "Book Returned", payload),
  ISB200INB: (payload = null) =>
    createCustomResponseObject("ISB200INB", "Book Issued", payload),
  MDW404FIBBAN: (payload = null) =>
    createCustomResponseObject(
      "MDW404FIBBAN",
      "Invalid Book Accession Number",
      payload
    ),
  MDW409FIBBAN: (payload = null) =>
    createCustomResponseObject("MDW409FIBBAN", "Book is not issued", payload),
  ISB200FIBBAN: (payload = null) =>
    createCustomResponseObject("ISB200FIBBAN", "Book Found", payload),
  MDW404FIBBI: (payload = null) =>
    createCustomResponseObject("MDW404FIBBI", "Book not found", payload),
  ISB200CIBF: (payload = null) =>
    createCustomResponseObject("ISB200CIBF", "Fine Calculated", payload),
  ISB200FAIB: (payload = null) =>
    createCustomResponseObject("ISB200FAIB", "Issued Books Fetched", payload),
  ISB200FARB: (payload = null) =>
    createCustomResponseObject("ISB200FARB", "Returned Books Fetched", payload),
  ISB200FRB: (payload = null) =>
    createCustomResponseObject("ISB200FRB", "Returned Book Fetched", payload),
  ISB200FIB: (payload = null) =>
    createCustomResponseObject("ISB200FIB", "Issued Book Fetched", payload),
  DBSF404GLOBAL: (payload = null) =>
    createCustomResponseObject("DBSF404GLOBAL", "No Document Found", payload),
  DBSF400GLOBAL: (payload = null) =>
    createCustomResponseObject("DBSF400GLOBAL", "Invalid ID Format", payload),
  DBSF200ISB: (payload = null) =>
    createCustomResponseObject(
      "DBSF200ISB",
      "Issued Book Document Fetched",
      payload
    ),
  DBSF200RSB: (payload = null) =>
    createCustomResponseObject(
      "DBSF200RSB",
      "Returned Book Document Fetched",
      payload
    ),
  DBSF200BA: (payload = null) =>
    createCustomResponseObject(
      "DBSF200BA",
      "Book Accession Document Fetched",
      payload
    ),
  DBSF200LC: (payload = null) =>
    createCustomResponseObject(
      "DBSF200LC",
      "Library Card Document Fetched",
      payload
    ),
  DBSF200BKS: (payload = null) =>
    createCustomResponseObject("DBSF200BKS", "Book Document Fetched", payload),
  DBSF200STU: (payload = null) =>
    createCustomResponseObject(
      "DBSF200STU",
      "Student Document Fetched",
      payload
    ),
  DBSF200APP: (payload = null) =>
    createCustomResponseObject(
      "DBSF200APP",
      "Application Document Fetched",
      payload
    ),
  DBSF200STF: (payload = null) =>
    createCustomResponseObject("DBSF200STF", "Staff Document Fetched", payload),
  DBSF200AUAD: (payload = null) =>
    createCustomResponseObject(
      "DBSF200AUAD",
      "Auth Admin Document Fetched",
      payload
    ),
  DBSF200AUST: (payload = null) =>
    createCustomResponseObject(
      "DBSF200AUST",
      "Auth Student Document Fetched",
      payload
    ),
  DBSF200AUAP: (payload = null) =>
    createCustomResponseObject(
      "DBSF200AUAP",
      "Auth Applicant Document Fetched",
      payload
    ),
  AUTH200SAPP: (payload = null) =>
    createCustomResponseObject(
      "AUTH200SAPP",
      "Please enter OTP that you recieved via your email",
      payload
    ),
  AUTH409SAPP: (payload = null) =>
    createCustomResponseObject("AUTH409SAPP", "Email already exists", payload),
  AUTH400VAPP: (payload = null) =>
    createCustomResponseObject("AUTH400VAPP", "Invalid OTP", payload),
  AUTH403VAPP: (payload = null) =>
    createCustomResponseObject("AUTH403VAPP", "OTP Time Out", payload),
  AUTH200VAPP: (payload = null) =>
    createCustomResponseObject(
      "AUTH200VAPP",
      "Account Created Successfully",
      payload
    ),
  AUTH409VAPP: (payload = null) =>
    createCustomResponseObject(
      "AUTH409VAPP",
      "Account Created Exists",
      payload
    ),
  AUTH404LAPP: (payload = null) =>
    createCustomResponseObject("AUTH404LAPP", "User doesn't Exists", payload),
  AUTH401LAPP: (payload = null) =>
    createCustomResponseObject("AUTH401LAPP", "Invalid Password", payload),
  AUTH200LAPP: (payload = null) =>
    createCustomResponseObject(
      "AUTH200LAPP",
      "Applicant Login Successful",
      payload
    ),
  APP200CNA: (payload = null) =>
    createCustomResponseObject(
      "APP200CNA",
      "Application Created Successfully",
      payload
    ),
  APP409CNA: (payload = null) =>
    createCustomResponseObject(
      "APP409CNA",
      "Roll Number already exists",
      payload
    ),
  APP200FA: (payload = null) =>
    createCustomResponseObject(
      "APP200FA",
      "Application Fetched Successfully",
      payload
    ),
  APP200DA: (payload = null) =>
    createCustomResponseObject("APP200DA", "Application Deleted", payload),
  APP404FA: (payload = null) =>
    createCustomResponseObject("APP404FA", "Application not found", payload),
  APP200RPA: (payload = null) =>
    createCustomResponseObject("APP200RPA", "Application Rejected", payload),
  APP200APA: (payload = null) =>
    createCustomResponseObject("APP200APA", "Application Approved", payload),
  AUTH401VPASS: (payload = null) =>
    createCustomResponseObject("AUTH401VPASS", "Invalid Password", payload),
  AUTH409AADM: (payload = null) =>
    createCustomResponseObject("AUTH409AADM", "Email Already Exists", payload),
  AUTH200AADM: (payload = null) =>
    createCustomResponseObject("AUTH200AADM", "Staff Member Added", payload),
  STF200FAS: (payload = null) =>
    createCustomResponseObject("STF200FAS", "All Staff Fetched", payload),
  STF200FSBI: (payload = null) =>
    createCustomResponseObject("STF200FSBI", "Staff Member Fetched", payload),
  FIN200FAF: (payload = null) =>
    createCustomResponseObject("FIN200FAF", "Fines Fetched", payload),
  FIN200FFBI: (payload = null) =>
    createCustomResponseObject("FIN200FFBI", "Fine Fetched", payload),
  FIN200ARN: (payload = null) =>
    createCustomResponseObject("FIN200ARN", "Reciept Number Added", payload),
  AUTH200CAP: (payload = null) =>
    createCustomResponseObject("AUTH200CAP", "Password Changed", payload),
  AUTH409CAP: (payload = null) =>
    createCustomResponseObject(
      "AUTH409CAP",
      "Current Password Incorrect",
      payload
    ),
  AUTH200RAPI: (payload = null) =>
    createCustomResponseObject("AUTH200RAPI", "OTP Sent", payload),
  AUTH404RAPI: (payload = null) =>
    createCustomResponseObject("AUTH404RAPI", "Invalid Email", payload),
  AUTH200RAPV: (payload = null) =>
    createCustomResponseObject("AUTH200RAPV", "Otp Verified", payload),
  AUTH401RAPV: (payload = null) =>
    createCustomResponseObject("AUTH401RAPV", "Invalid OTP", payload),
  AUTH200RAP: (payload = null) =>
    createCustomResponseObject("AUTH200RAP", "Password Changed", payload),
  AUTH402RAPV: (payload = null) =>
    createCustomResponseObject(
      "AUTH402RAPV",
      "Account Locked due to miltiple incorrect OTP inputs",
      payload
    ),
  ISB200CIBD: (payload = null) =>
    createCustomResponseObject(
      "ISB200CIBD",
      "Number of Issued books fetched",
      payload
    ),
  REB200CRBD: (payload = null) =>
    createCustomResponseObject(
      "REB200CRBD",
      "Number of Returned books fetched",
      payload
    ),
  BKS200CTBA: (payload = null) =>
    createCustomResponseObject(
      "BKS200CTBA",
      "Number of Book Accessions fetched",
      payload
    ),
  BKS200EB: (payload = null) =>
    createCustomResponseObject("BKS200EB", "Book details updated", payload),

  STU200CTS: (payload = null) =>
    createCustomResponseObject(
      "STU200CTS",
      "Number of Students fetched",
      payload
    ),
  AUTH200RECAPTCHA: (payload = null) =>
    createCustomResponseObject(
      "AUTH200RECAPTCHA",
      "reCAPTCHA success",
      payload
    ),
};

module.exports = crs;
