/*
 * References:
 * - https://developer.twitter.com/en/docs/authentication/oauth-1-0a/percent-encoding-parameters
 * - https://www.rfc-editor.org/rfc/rfc3986
 * - https://en.wikipedia.org/wiki/ASCII
 */

export const percentEncode = (str: string | number | boolean): string =>
  // NOTE:
  // Since `encodeURIComponent` does not encode some characters that should be encoded
  // (See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent),
  // it substitutes those characters to follow with RFC 3986.
  encodeURIComponent(str)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");
