import { getFingerprint } from "./fingerprint";
import { API_URL } from "./keys";

const buildOptions = (method, body = null) => {
  const headers = {
    "Content-Type": "application/json",
    "X-Fingerprint": getFingerprint(),
  };

  return {
    method,
    headers,
    credentials: "include",
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
};

export const restCall = async (endpoint, body = null, expectedCodes = []) => {
  const allowedCodes = Array.isArray(expectedCodes)
    ? expectedCodes
    : [expectedCodes];

  const method = body ? "POST" : "GET";
  const options = buildOptions(method, body);

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw {
        code: `HTTP${response.status}`,
        message: result?.message || "Request failed",
        data: result?.data || null,
      };
    }

    if (!allowedCodes.includes(result.code)) {
      throw {
        code: result.code || "UNKNOWN_CODE",
        message: result.message || "Unexpected response code",
        data: result.data || null,
      };
    }

    return result;
  } catch (err) {
    return Promise.reject({
      code: err.code || "FETCH_ERROR",
      message: err.message || "Could not connect to server",
      data: err.data || null,
    });
  }
};

export const uploadImage = (formData) => {
  return fetch(`${API_URL}/public/upload/image`, {
    method: "POST",
    body: formData,
  });
};
