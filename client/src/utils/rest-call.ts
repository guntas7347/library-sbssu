// utils/restCall.ts
import { getFingerprint } from "./fingerprint";
import { API_URL } from "./keys";
import { ApiResponse } from "../types/api";

const buildOptions = (method: string, body: any = null): RequestInit => {
  const headers: HeadersInit = {
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

export async function restCall<T = any>(
  endpoint: string,
  body: any = null,
  expectedCodes: string[] | string = []
): Promise<ApiResponse<T>> {
  const allowedCodes = Array.isArray(expectedCodes)
    ? expectedCodes
    : [expectedCodes];

  const method = body ? "POST" : "GET";
  const options = buildOptions(method, body);

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, options);
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const result: ApiResponse<T> =
      response.status === 204 || !isJson
        ? { code: "", message: "", data: null }
        : await response.json();

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
  } catch (err: any) {
    return Promise.reject({
      code: err.code || "FETCH_ERROR",
      message: err.message || "Could not connect to server",
      data: err.data || null,
    });
  }
}

export const uploadImage = (formData: FormData) => {
  return fetch(`${API_URL}/public/upload/image`, {
    method: "POST",
    body: formData,
  });
};
