const createCustomResponseObject = (s: string, m: string, p = null) => {
  return { s, m, p };
};

export const crs = {
  BADREQ: (m: string, p = null) => createCustomResponseObject("BADREQ", m, p),
  CUST: (m: string, p = null) => createCustomResponseObject("CUST", m, p),
  ULD201IMG: (payload: any = null) =>
    createCustomResponseObject(
      "ULD201IMG",
      "Image uploaded successfully",
      payload
    ),
  ULD200DELIMG: (payload: any = null) =>
    createCustomResponseObject(
      "ULD200DELIMG",
      "Image deleted successfully",
      payload
    ),
  SRH200GLB: (payload: any = null) =>
    createCustomResponseObject("SRH200GLB", "Search Success", payload),
  SRH404GLB: (payload: any = null) =>
    createCustomResponseObject("SRH200GLB", "No Data Found", payload),
  STU201CNS: (payload: any = null) =>
    createCustomResponseObject(
      "STU201CNS",
      "Member created successfully",
      payload
    ),
  STU200ES: (payload: any = null) =>
    createCustomResponseObject(
      "STU200ES",
      "Member Edited successfully",
      payload
    ),
  SET200CRT: (payload: any = null) =>
    createCustomResponseObject("SET200CRT", "Setting created", payload),
  SET200GET: (payload: any = null) =>
    createCustomResponseObject("SET200GET", "Setting fetched", payload),
  SET200UPD: (payload: any = null) =>
    createCustomResponseObject("SET200UPD", "Setting updated", payload),
  CONFL409CNS: (payload: any = null) =>
    createCustomResponseObject(
      "CONFL409CNS",
      "Roll number already exists",
      payload
    ),

  VAL400FAIL: (payload: any = null) =>
    createCustomResponseObject("VAL400FAIL", "Invalid Input", payload),
  ISB403PD: (payload: any = null) =>
    createCustomResponseObject("ISB403PD", "Issue not permitted", payload),
  LOG200LOGIN: (payload: any = null) =>
    createCustomResponseObject("LOG200LOGIN", "Login logs fetched", payload),
  SERR500REST: (payload: any = null) =>
    createCustomResponseObject("SERR500REST", "Internal Server Error", payload),
  CUSTOMRES: (res = "") => createCustomResponseObject("CUSTOMRES", res, null),
  PRISMA2002ERR: (error = "") =>
    createCustomResponseObject("PRISMA2002ERR", "Duplicate value", null),
  STU404FSBRN: (payload: any = null) =>
    createCustomResponseObject("STU404FSBRN", "Member not found", payload),
  STU200FSBRN: (payload: any = null) =>
    createCustomResponseObject("STU200FSBRN", "Member found", payload),
  MEB200MI: (payload: any = null) =>
    createCustomResponseObject("MEB200MI", "No due issued", payload),
  MEB409MILU: (payload: any = null) =>
    createCustomResponseObject("MEB409MILU", "Library Cards not free", payload),
  MEB409MIPD: (payload: any = null) =>
    createCustomResponseObject("MEB409MIPD", "Balance not zero", payload),
  STU409ALCTS: (payload: any = null) =>
    createCustomResponseObject(
      "STU409ALCTS",
      "Member alread has maximum number of alloted library Cards",
      payload
    ),
  STU4091ALCTS: (payload: any = null) =>
    createCustomResponseObject(
      "STU4091ALCTS",
      "Card Number already exists",
      payload
    ),
  STU200ALCTS: (payload: any = null) =>
    createCustomResponseObject(
      "STU200ALCTS",
      "Library Card alloted successfully",
      payload
    ),
  ADM401JWT: (payload: any = null) =>
    createCustomResponseObject("ADM401JWT", "Authentication Failed", payload),
  ADM403JWT: (payload: any = null) =>
    createCustomResponseObject("ADM403JWT", "Forbidden Request", payload),
  STF401JWT: (payload: any = null) =>
    createCustomResponseObject(
      "STF401JWT",
      "Staff Authentication Failed",
      payload
    ),
  AUTH401JWT: (payload: any = null) =>
    createCustomResponseObject(
      "AUTH401JWT",
      "Session expired, Please relogin",
      payload
    ),
  AUTH200SOUT: (payload: any = null) =>
    createCustomResponseObject("AUTH200SOUT", "Sign Out Successfull", payload),
  AUTH401PING: (payload: any = null) =>
    createCustomResponseObject("AUTH401PING", "Authentication Failed", payload),
  AUTH200PING: (payload: any = null) =>
    createCustomResponseObject(
      "AUTH200PING",
      "Authentication Successful",
      payload
    ),
  AUTH200ADM: (payload: any = null) =>
    createCustomResponseObject("AUTH200ADM", "Admin Login Successful", payload),
  AUTH404ADM: (payload: any = null) =>
    createCustomResponseObject("AUTH404ADM", "Invalid Username", payload),
  AUTH404STU: (payload: any = null) =>
    createCustomResponseObject("AUTH404STU", "Invalid Username", payload),
  AUTH200STU: (payload: any = null) =>
    createCustomResponseObject("AUTH200STU", "Login Successful", payload),
  AUTH401ADM: (payload: any = null) =>
    createCustomResponseObject("AUTH401ADM", "Invalid Password", payload),
  ERR500JWT: (payload: any = null) =>
    createCustomResponseObject("ERR500JWT", "Unable to Authenticate", payload),
  STU200FAS: (payload: any = null) =>
    createCustomResponseObject("STU200FAS", "Members fetched", payload),
  STU201CNA: (payload: any = null) =>
    createCustomResponseObject("STU201CNA", "Application created", payload),
  STU200FA: (payload: any = null) =>
    createCustomResponseObject("STU200FA", "Application fetched", payload),
  STU201DA: (payload: any = null) =>
    createCustomResponseObject("STU201DA", "Application deleted", payload),
  STU200FAA: (payload: any = null) =>
    createCustomResponseObject("STU200FAA", "Applications fetched", payload),
  BKS409ANB: (payload: any = null) =>
    createCustomResponseObject("BKS409ANB", "ISBN already exists", payload),
  BKS200ANB: (payload: any = null) =>
    createCustomResponseObject(
      "BKS200ANB",
      "Book created successfully",
      payload
    ),
  BKS200FAB: (payload: any = null) =>
    createCustomResponseObject("BKS200FAB", "Books fetched", payload),
  BKS200FBBI: (payload: any = null) =>
    createCustomResponseObject("BKS200FBBI", "Book fetched", payload),
  BKS404FBBI: (payload: any = null) =>
    createCustomResponseObject("BKS404FBBI", "Book not found", payload),
  MDW404FBBI: (payload: any = null) =>
    createCustomResponseObject("MDW404FBBI", "Book not found", payload),
  BKS409ABA: (payload: any = null) =>
    createCustomResponseObject(
      "BKS409ABA",
      "Accession number already exists",
      payload
    ),
  BKS200ABA: (payload: any = null) =>
    createCustomResponseObject("BKS200ABA", "Accession number added", payload),
  BKS404FBDBI: (payload: any = null) =>
    createCustomResponseObject("BKS404FBDBI", "Book not found", payload),
  BKS200FBDBI: (payload: any = null) =>
    createCustomResponseObject("BKS200FBDBI", "Book found", payload),
  STU404FSBI: (payload: any = null) =>
    createCustomResponseObject("STU404FSBI", "Member not found", payload),
  STU200FSBI: (payload: any = null) =>
    createCustomResponseObject("STU200FSBI", "Member found", payload),
  BKS200FBBAN: (payload: any = null) =>
    createCustomResponseObject("BKS200FBBAN", "Book found", payload),
  MDW404FBBAN: (payload: any = null) =>
    createCustomResponseObject("MDW404FBBAN", "Book not found", payload),
  MDW409VBAA: (payload: any = null) =>
    createCustomResponseObject("MDW409VBAA", "Book not available", payload),
  MDW401VBBB: (payload: any = null) =>
    createCustomResponseObject(
      "MDW401VBBB",
      "Issue compatibility error",
      payload
    ),
  MDW409VLCA: (payload: any = null) =>
    createCustomResponseObject(
      "MDW409VLCA",
      "Library Card not available",
      payload
    ),
  MAIL500ERR: (payload: any = null) =>
    createCustomResponseObject(
      "MAIL500ERR",
      "Operation successful but Confirmation Email could not be sent",
      payload
    ),
  MDW500APM: (payload: any = null) =>
    createCustomResponseObject(
      "MDW500APM",
      "Member approved but Confirmation Email could not be sent",
      payload
    ),

  MDW500SICE: (payload: any = null) =>
    createCustomResponseObject(
      "MDW500SICE",
      "Book has been Issued but Confirmation Email could not be sent",
      payload
    ),
  MDW500SRCE: (payload: any = null) =>
    createCustomResponseObject(
      "MDW500SICE",
      "Book has been Returned but Confirmation Email could not be sent",
      payload
    ),
  ISB200RIB: (payload: any = null) =>
    createCustomResponseObject("ISB200RIB", "Book Returned", payload),
  ISB200INB: (payload: any = null) =>
    createCustomResponseObject("ISB200INB", "Book Issued", payload),
  MDW404FIBBAN: (payload: any = null) =>
    createCustomResponseObject(
      "MDW404FIBBAN",
      "Invalid Book Accession Number",
      payload
    ),
  MDW409FIBBAN: (payload: any = null) =>
    createCustomResponseObject("MDW409FIBBAN", "Book is not issued", payload),
  ISB200FIBBAN: (payload: any = null) =>
    createCustomResponseObject("ISB200FIBBAN", "Book Found", payload),
  MDW404FIBBI: (payload: any = null) =>
    createCustomResponseObject("MDW404FIBBI", "Book not found", payload),
  ISB200CIBF: (payload: any = null) =>
    createCustomResponseObject("ISB200CIBF", "Fine Calculated", payload),
  ISB200FAIB: (payload: any = null) =>
    createCustomResponseObject("ISB200FAIB", "Issued Books Fetched", payload),
  ISB200FARB: (payload: any = null) =>
    createCustomResponseObject("ISB200FARB", "Returned Books Fetched", payload),
  ISB200FRB: (payload: any = null) =>
    createCustomResponseObject("ISB200FRB", "Returned Book Fetched", payload),
  ISB200FIB: (payload: any = null) =>
    createCustomResponseObject("ISB200FIB", "Issued Book Fetched", payload),
  DBSF404GLOBAL: (payload: any = null) =>
    createCustomResponseObject("DBSF404GLOBAL", "No Document Found", payload),
  DBSF400GLOBAL: (payload: any = null) =>
    createCustomResponseObject("DBSF400GLOBAL", "Invalid ID Format", payload),
  DBSF200ISB: (payload: any = null) =>
    createCustomResponseObject(
      "DBSF200ISB",
      "Issued Book Document Fetched",
      payload
    ),
  DBSF200RSB: (payload: any = null) =>
    createCustomResponseObject(
      "DBSF200RSB",
      "Returned Book Document Fetched",
      payload
    ),
  DBSF200BA: (payload: any = null) =>
    createCustomResponseObject(
      "DBSF200BA",
      "Book Accession Document Fetched",
      payload
    ),
  DBSF200LC: (payload: any = null) =>
    createCustomResponseObject(
      "DBSF200LC",
      "Library Card Document Fetched",
      payload
    ),
  DBSF200BKS: (payload: any = null) =>
    createCustomResponseObject("DBSF200BKS", "Book Document Fetched", payload),
  DBSF200STU: (payload: any = null) =>
    createCustomResponseObject(
      "DBSF200STU",
      "Member Document Fetched",
      payload
    ),
  DBSF200APP: (payload: any = null) =>
    createCustomResponseObject(
      "DBSF200APP",
      "Application Document Fetched",
      payload
    ),
  DBSF200STF: (payload: any = null) =>
    createCustomResponseObject("DBSF200STF", "Staff Document Fetched", payload),
  DBSF200AUAD: (payload: any = null) =>
    createCustomResponseObject(
      "DBSF200AUAD",
      "Auth Admin Document Fetched",
      payload
    ),
  DBSF200AUST: (payload: any = null) =>
    createCustomResponseObject(
      "DBSF200AUST",
      "Auth Member Document Fetched",
      payload
    ),
  DBSF200AUAP: (payload: any = null) =>
    createCustomResponseObject(
      "DBSF200AUAP",
      "Auth Applicant Document Fetched",
      payload
    ),
  AUTH200SAPP: (payload: any = null) =>
    createCustomResponseObject(
      "AUTH200SAPP",
      "Password link sent to email",
      payload
    ),
  AUTH409SAPP: (payload: any = null) =>
    createCustomResponseObject("AUTH409SAPP", "Email already exists", payload),
  AUTH400VAPP: (payload: any = null) =>
    createCustomResponseObject("AUTH400VAPP", "Invalid OTP", payload),
  AUTH403VAPP: (payload: any = null) =>
    createCustomResponseObject("AUTH403VAPP", "OTP Time Out", payload),
  AUTH200VAPP: (payload: any = null) =>
    createCustomResponseObject(
      "AUTH200VAPP",
      "Account Created Successfully",
      payload
    ),
  AUTH409VAPP: (payload: any = null) =>
    createCustomResponseObject(
      "AUTH409VAPP",
      "Account Created Exists",
      payload
    ),
  AUTH404LAPP: (payload: any = null) =>
    createCustomResponseObject("AUTH404LAPP", "User doesn't Exists", payload),
  AUTH401LAPP: (payload: any = null) =>
    createCustomResponseObject("AUTH401LAPP", "Invalid Password", payload),
  AUTH200LAPP: (payload: any = null) =>
    createCustomResponseObject(
      "AUTH200LAPP",
      "Applicant Login Successful",
      payload
    ),
  AUTH200LDPS: (payload: any = null) =>
    createCustomResponseObject(
      "AUTH200LDPS",
      "Reset Link sent to email",
      payload
    ),
  AUTH200LVFS: (payload: any = null) =>
    createCustomResponseObject("AUTH200LVFS", "Enter new password", payload),
  AUTH404LDPS: (payload: any = null) =>
    createCustomResponseObject("AUTH400LDPS", "Invalid Reset Link", payload),
  APP200CNA: (payload: any = null) =>
    createCustomResponseObject(
      "APP200CNA",
      "Application Created Successfully",
      payload
    ),
  APP409CNA: (payload: any = null) =>
    createCustomResponseObject(
      "APP409CNA",
      "Roll Number already exists",
      payload
    ),
  APP200FA: (payload: any = null) =>
    createCustomResponseObject(
      "APP200FA",
      "Application Fetched Successfully",
      payload
    ),
  APP200DA: (payload: any = null) =>
    createCustomResponseObject("APP200DA", "Application Deleted", payload),
  APP404FA: (payload: any = null) =>
    createCustomResponseObject("APP404FA", "Application not found", payload),
  APP200RPA: (payload: any = null) =>
    createCustomResponseObject("APP200RPA", "Application Rejected", payload),
  APP200APA: (payload: any = null) =>
    createCustomResponseObject("APP200APA", "Application Approved", payload),
  AUTH401VPASS: (payload: any = null) =>
    createCustomResponseObject("AUTH401VPASS", "Invalid Password", payload),
  AUTH409AADM: (payload: any = null) =>
    createCustomResponseObject("AUTH409AADM", "Email Already Exists", payload),
  AUTH200AADM: (payload: any = null) =>
    createCustomResponseObject("AUTH200AADM", "Staff Member Added", payload),
  STF200FAS: (payload: any = null) =>
    createCustomResponseObject("STF200FAS", "All Staff Fetched", payload),
  STF200FSBI: (payload: any = null) =>
    createCustomResponseObject("STF200FSBI", "Staff Member Fetched", payload),
  STF201ESDI: (payload: any = null) =>
    createCustomResponseObject("STF201ESDI", "Staff Member Edited", payload),
  FIN200FAF: (payload: any = null) =>
    createCustomResponseObject("FIN200FAF", "Fines Fetched", payload),
  FIN200FFBI: (payload: any = null) =>
    createCustomResponseObject("FIN200FFBI", "Fine Fetched", payload),
  TRN200FT: (payload: any = null) =>
    createCustomResponseObject("TRN200FT", "Transactions Fetched", payload),
  TRN200FTBI: (payload: any = null) =>
    createCustomResponseObject("TRN200FTBI", "Transaction Fetched", payload),
  TRN200AT: (payload: any = null) =>
    createCustomResponseObject("TRN200AT", "Transaction Added", payload),
  TRN200FM: (payload: any = null) =>
    createCustomResponseObject("TRN200FM", "Member Fetched", payload),
  TRN404FM: (payload: any = null) =>
    createCustomResponseObject("TRN404FM", "Member not found", payload),
  TRN400FM: (payload: any = null) =>
    createCustomResponseObject(
      "TRN400FM",
      "MembershipId must be a 6-digit number",
      payload
    ),
  FIN200ARN: (payload: any = null) =>
    createCustomResponseObject("FIN200ARN", "Reciept Number Added", payload),
  AUTH200CAP: (payload: any = null) =>
    createCustomResponseObject("AUTH200CAP", "Password Changed", payload),
  AUTH409CAP: (payload: any = null) =>
    createCustomResponseObject(
      "AUTH409CAP",
      "Current Password Incorrect",
      payload
    ),
  AUTH200RAPI: (payload: any = null) =>
    createCustomResponseObject("AUTH200RAPI", "OTP Sent", payload),
  AUTH404RAPI: (payload: any = null) =>
    createCustomResponseObject("AUTH404RAPI", "Invalid Username", payload),
  AUTH200RAPV: (payload: any = null) =>
    createCustomResponseObject("AUTH200RAPV", "Otp Verified", payload),
  AUTH401RAPV: (payload: any = null) =>
    createCustomResponseObject("AUTH401RAPV", "Invalid TOTP", payload),
  AUTH200RAP: (payload: any = null) =>
    createCustomResponseObject("AUTH200RAP", "Password Changed", payload),
  AUTH402RAPV: (payload: any = null) =>
    createCustomResponseObject(
      "AUTH402RAPV",
      "Account Locked due to multiple incorrect OTP inputs",
      payload
    ),
  ISB200CIBD: (payload: any = null) =>
    createCustomResponseObject(
      "ISB200CIBD",
      "Number of Issued books fetched",
      payload
    ),
  REB200CRBD: (payload: any = null) =>
    createCustomResponseObject(
      "REB200CRBD",
      "Number of Returned books fetched",
      payload
    ),
  BKS200CTBA: (payload: any = null) =>
    createCustomResponseObject(
      "BKS200CTBA",
      "Number of Book Accessions fetched",
      payload
    ),
  BKS200EB: (payload: any = null) =>
    createCustomResponseObject("BKS200EB", "Book details updated", payload),

  STU200CTS: (payload: any = null) =>
    createCustomResponseObject(
      "STU200CTS",
      "Number of Members fetched",
      payload
    ),
  AUTH200RECAPTCHA: (payload: any = null) =>
    createCustomResponseObject(
      "AUTH200RECAPTCHA",
      "reCAPTCHA success",
      payload
    ),
  API200WEATHER: (payload: any = null) =>
    createCustomResponseObject(
      "API200WEATHER",
      "Weather deatils fetched",
      payload
    ),
};
