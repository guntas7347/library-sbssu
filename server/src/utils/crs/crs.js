import CRS_CODES from "./crs-codes.js";

/**
 * A dual-purpose utility for creating standardized API responses.
 *
 * 1. As a function: Call `crs("Your custom message")` to generate a response
 * with a generic "CUSTOM" code.
 *
 * 2. As an object: Use `crs.CODE(data)` for standard, pre-defined responses.
 *
 * @param {string} message - A custom message for a non-standard response.
 * @returns {{code: string, message: string, data: any}}
 */
const crs = (message) => {
  // This handles the direct call: crs("some message")
  if (typeof message === "string") {
    return {
      code: "CUSTOM", // A generic code for non-standard, direct messages
      message: message,
      data: null,
    };
  }

  // Fallback for incorrect direct calls (e.g., crs(123))
  return {
    code: "UNKNOWN_ERROR",
    message: "Invalid response generation: crs() must be called with a string.",
    data: null,
  };
};

/**
 * Helper to create a standard response object.
 */
const crsObj = (code, defaultMessage, data = null) => {
  return {
    code,
    message: defaultMessage,
    data,
  };
};

// --- Attach all standard response functions as properties to the main `crs` function ---
for (const [code, message] of Object.entries(CRS_CODES)) {
  /**
   * @param {any} [data=null] - The optional data payload for the response.
   */
  crs[code] = (data = null) => crsObj(code, message, data);
}

export default crs;
