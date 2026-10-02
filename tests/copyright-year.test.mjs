import assert from "node:assert/strict";
import test from "node:test";
import { getCopyrightYear } from "../app/copyright-year.mjs";

test("o ano usa UTC na virada anual", () => {
  assert.equal(getCopyrightYear(new Date("2027-01-01T01:00:00Z")), 2027);
  assert.equal(getCopyrightYear(new Date("2026-12-31T23:59:59Z")), 2026);
});
