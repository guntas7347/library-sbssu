const CRS_CODES = {
  AUTH_200_LOGIN_SUCCESS: "Login successful",
  AUTH_200_SESSION_CLEARED: "Session cleared",
  AUTH_401_INVALID_CREDENTIALS: "Invalid credentials",
  AUTH_401_UNAUTHORIZED: "Authentication required",
  AUTH_403_FORBIDDEN: "Access denied",
  AUTH_200_PASSWORD_RESET_SENT: "Password reset link sent	",
  AUTH_400_INVALID_RESET_LINK: "Invalid password reset link",
  AUTH_200_LINK_VERIFIED: "Password reset link verified",
  AUTH_200_PASSWORD_RESET_SUCCESS: "Password has been reset successfully",
  AUTH_200_PING_SUCCESS: "Ping successful",
  AUTH_401_PING_UNAUTHORIZED: "Ping unauthorized",
  AUTH_401_INVALID_FINGERPRINT: "Invalid fingerprint",
  AUTH_401_INVALID_JWT: "Session expired",
  AUTH_500_JWT_SERVER_ERROR: "JWT processing failed on server",
  AUTH_401_INSUFFICIENT_ROLE: "Insufficient role permissions for JWT",
  AUTH_200_SIGNOUT_SUCCESS: "Sign-out successful",

  SERR_500_INTERNAL: "Internal server error",
  SERR_500_DB_FAILURE: "Database failure",
  SERR_500_REDIS_TIMEOUT: "Redis timeout",
  SERR_500_UNKNOWN: "Unknown server error",
  DATA_204_NOT_FOUND: "No data found",

  APPLICATION_200_FETCHED: "Application fetched successfully",
  APPLICATION_200_SEARCHED: "Applications searched successfully",
  APPLICATION_204_NOT_AVAILABLE: "No applications available",
  APPLICATION_200_APPROVED: "Application approved successfully",
  APPLICATION_200_REJECTED: "Application rejected successfully",

  MEMBER_200_FETCHED: "Member fetched successfully",
  MEMBER_201_CREATED: "Member created successfully",
  MEMBER_200_UPDATED: "Member updated successfully",
  MEMBER_200_ALL_FETCHED: "All members fetched successfully",
  MEMBER_200_PROFILE_FETCHED: "Member profile fetched successfully",

  SETTINGS_200_FETCHED: "Settings fetched successfully",
  SETTINGS_200_UPDATED: "Settings updated successfully",

  STAFF_200_FETCHED: "Staff fetched successfully",
  STAFF_201_CREATED: "Staff created successfully",
  STAFF_200_UPDATED: "Staff updated successfully",
  STAFF_200_ALL_FETCHED: "All staff fetched successfully",
  STAFF_200_PROFILE_FETCHED: "Staff profile fetched successfully",

  UPLOADER_200_IMAGE_UPLOADED: "Image uploaded successfully",

  PUBLIC_200_PROGRAMS_FETCHED: "Programs fetched successfully",
  PUBLIC_201_APPLICATION_CREATED: "Application created successfully",
  PUBLIC_200_APPLICATION_FETCHED: "Application fetched successfully",
  PUBLIC_200_APPLICATION_DELETED: "Application deleted successfully",

  ZOD_400_INVALID_INPUT: "Invalid input",
};

export default CRS_CODES;
