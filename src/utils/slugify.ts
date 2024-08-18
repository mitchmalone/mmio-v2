import { default as slugger } from "slugify";

/**
 * Generates a URL-friendly slug from a given string.
 *
 * @param {string} str - The input string to be slugified.
 * @return {string} The slugified string.
 */
const slugify = (str: string) => {
  return slugger(str, {
    lower: true,
    strict: true,
  });
};

export default slugify;
