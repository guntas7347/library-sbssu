import { sha256 } from "js-sha256";

export const createFingerprint = () => {
  const fingerprintData = {
    userAgent: navigator.userAgent,
    language:
      navigator.language || (navigator.languages && navigator.languages[0]),
    platform: navigator.platform,
    timezoneOffset: new Date().getTimezoneOffset(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    doNotTrack: navigator.doNotTrack,
    colorDepth: window.screen.colorDepth,
    cookieEnabled: navigator.cookieEnabled,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory,
    touchSupport:
      "ontouchstart" in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0),
  };

  const dataString = Object.entries(fingerprintData)
    .map(([key, val]) => `${key}=${val}`)
    .join(";");

  return sha256(dataString);
};

export const getFingerprint = () => {
  const f = sessionStorage.getItem("fingerprint");
  if (f) return f;
  const nf = createFingerprint();
  sessionStorage.setItem("fingerprint", nf);
  return nf;
};
