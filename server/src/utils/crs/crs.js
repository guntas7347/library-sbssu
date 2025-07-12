import CRS_CODES from "./crs-codes.js";

const crsObj = (code, message, data = null) => {
  return { code, message, data };
};

const crs = {};

for (const [code, message] of Object.entries(CRS_CODES)) {
  crs[code] = (data = null) => crsObj(code, message, data);
}

export default crs;
