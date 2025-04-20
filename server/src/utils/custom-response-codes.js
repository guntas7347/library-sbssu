const createCustomResponseObject = (status, message, payload = null) => {
  return { status, message, payload };
};

const crs = {
  ULD201IMG: (payload = null) =>
    createCustomResponseObject(
      "ULD201IMG",
      "Image created successfully",
      payload
    ),
  ULD200DELIMG: (payload = null) =>
    createCustomResponseObject(
      "ULD200DELIMG",
      "Image deleted successfully",
      payload
    ),
  SRH200GLB: (payload = null) =>
    createCustomResponseObject("SRH200GLB", "Search Success", payload),
  SRH404GLB: (payload = null) =>
    createCustomResponseObject("SRH200GLB", "No Data Found", payload),
  STU201CNS: (payload = null) =>
    createCustomResponseObject(
      "STU201CNS",
      "Member created successfully",
      payload
    ),
  STU200ES: (payload = null) =>
    createCustomResponseObject(
      "STU200ES",
      "Member Edited successfully",
      payload
    ),
  SET200CRT: (payload = null) =>
    createCustomResponseObject("SET200CRT", "Setting created", payload),
  SET200GET: (payload = null) =>
    createCustomResponseObject("SET200GET", "Setting fetched", payload),
  SET200UPD: (payload = null) =>
    createCustomResponseObject("SET200UPD", "Setting updated", payload),
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
  VAL400FAIL: (payload = null) =>
    createCustomResponseObject("VAL400FAIL", "Invalid Input", payload),
  ISB403PD: (payload = null) =>
    createCustomResponseObject("ISB403PD", "Issue not permitted", payload),

  SERR500REST: (payload = null) =>
    createCustomResponseObject("SERR500REST", "Internal Server Error", payload),
  CUSTOMRES: (res = "") => createCustomResponseObject("CUSTOMRES", res, null),
  STU404FSBRN: (payload = null) =>
    createCustomResponseObject("STU404FSBRN", "Member not found", payload),
  STU200FSBRN: (payload = null) =>
    createCustomResponseObject("STU200FSBRN", "Member found", payload),
  MEB200MI: (payload = null) =>
    createCustomResponseObject(
      "MEB200MI",
      "Member marked as inactive",
      payload
    ),
  MEB409MILU: (payload = null) =>
    createCustomResponseObject("MEB409MILU", "Library Cards not free", payload),
  MEB409MIPD: (payload = null) =>
    createCustomResponseObject("MEB409MIPD", "Balance not zero", payload),
  STU409ALCTS: (payload = null) =>
    createCustomResponseObject(
      "STU409ALCTS",
      "Member alread has maximum number of alloted library Cards",
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
    createCustomResponseObject("ADM401JWT", "Authentication Failed", payload),
  ADM403JWT: (payload = null) =>
    createCustomResponseObject("ADM403JWT", "Forbidden Request", payload),
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
    createCustomResponseObject("STU200FAS", "Members fetched", payload),
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
    createCustomResponseObject("STU404FSBI", "Member not found", payload),
  STU200FSBI: (payload = null) =>
    createCustomResponseObject("STU200FSBI", "Member found", payload),
  BKS200FBBAN: (payload = null) =>
    createCustomResponseObject("BKS200FBBAN", "Book found", payload),
  MDW404FBBAN: (payload = null) =>
    createCustomResponseObject("MDW404FBBAN", "Book not found", payload),
  MDW409VBAA: (payload = null) =>
    createCustomResponseObject("MDW409VBAA", "Book not available", payload),
  MDW401VBBB: (payload = null) =>
    createCustomResponseObject(
      "MDW401VBBB",
      "This Library Card doesn't issue Book Bank Books",
      payload
    ),
  MDW409VLCA: (payload = null) =>
    createCustomResponseObject(
      "MDW409VLCA",
      "Library Card not available",
      payload
    ),
  MDW500APM: (payload = null) =>
    createCustomResponseObject(
      "MDW500APM",
      "Member approved but Confirmation Email could not be sent",
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
      "Member Document Fetched",
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
      "Auth Member Document Fetched",
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
      "Password link sent to email",
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
  AUTH200LDPS: (payload = null) =>
    createCustomResponseObject(
      "AUTH200LDPS",
      "Reset Link sent to email",
      payload
    ),
  AUTH200LVFS: (payload = null) =>
    createCustomResponseObject("AUTH200LVFS", "Enter new password", payload),
  AUTH404LDPS: (payload = null) =>
    createCustomResponseObject("AUTH400LDPS", "Invalid Reset Link", payload),
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
  STF201ESDI: (payload = null) =>
    createCustomResponseObject("STF201ESDI", "Staff Member Edited", payload),
  FIN200FAF: (payload = null) =>
    createCustomResponseObject("FIN200FAF", "Fines Fetched", payload),
  FIN200FFBI: (payload = null) =>
    createCustomResponseObject("FIN200FFBI", "Fine Fetched", payload),
  TRN200FT: (payload = null) =>
    createCustomResponseObject("TRN200FT", "Transactions Fetched", payload),
  TRN200FTBI: (payload = null) =>
    createCustomResponseObject("TRN200FTBI", "Transaction Fetched", payload),
  TRN200AT: (payload = null) =>
    createCustomResponseObject("TRN200AT", "Transaction Added", payload),
  TRN200FM: (payload = null) =>
    createCustomResponseObject("TRN200FM", "Member Fetched", payload),
  TRN404FM: (payload = null) =>
    createCustomResponseObject("TRN404FM", "Member not found", payload),
  TRN400FM: (payload = null) =>
    createCustomResponseObject(
      "TRN400FM",
      "MembershipId must be a 6-digit number",
      payload
    ),
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
      "Number of Members fetched",
      payload
    ),
  AUTH200RECAPTCHA: (payload = null) =>
    createCustomResponseObject(
      "AUTH200RECAPTCHA",
      "reCAPTCHA success",
      payload
    ),
  API200WEATHER: (payload = null) =>
    createCustomResponseObject(
      "API200WEATHER",
      "Weather deatils fetched",
      payload
    ),
};

module.exports = crs;
