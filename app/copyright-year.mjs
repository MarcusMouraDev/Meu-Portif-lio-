/** @param {Date} [now] */
export function getCopyrightYear(now = new Date()) {
  return now.getUTCFullYear();
}
