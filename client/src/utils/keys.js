export const IS_DEV = true; // change to false for production

const API_PORT = IS_DEV ? ":8080" : "";
const UPLOADS_PORT = IS_DEV ? ":8080" : "";
const URL_PORT = IS_DEV ? ":5173" : "";

export const API_URL = `${window.location.protocol}//${window.location.hostname}${API_PORT}/api`;
export const UPLOADS_PATH = `${window.location.protocol}//${window.location.hostname}${UPLOADS_PORT}/uploads`;
export const URL_PATH = `${window.location.protocol}//${window.location.hostname}${URL_PORT}`;
