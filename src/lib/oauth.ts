/*
 * References:
 * - https://developer.twitter.com/en/docs/authentication/oauth-1-0a/creating-a-signature
 */

import jsSHA from "jssha";
import * as crypto from "crypto";
import { percentEncode } from "./encode";

export const createParameterString = (
  parameters: Record<string, string | number | boolean>
): string =>
  Object.entries(parameters)
    .map(([key, value]) => [percentEncode(key), percentEncode(value)])
    .sort(([k1, _v1], [k2, _v2]) => (k1 < k2 ? -1 : k1 > k2 ? 1 : 0)) // NOTE: sort lexicographically
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

export const createSignatureBaseString = (
  httpMethod: string,
  baseURL: string,
  parameterString: string
) =>
  [
    httpMethod.toUpperCase(),
    percentEncode(baseURL),
    percentEncode(parameterString),
  ].join("&");

export const createSigningKey = (
  consumerSecret: string,
  oauthTokenSecret: string
): string => [consumerSecret, oauthTokenSecret].map(percentEncode).join("&");

export const generateSignature = (
  signatureBaseString: string,
  signingKey: string
): string => {
  const shaObj = new jsSHA("SHA-1", "TEXT", {
    hmacKey: { value: signingKey, format: "TEXT" },
  });
  shaObj.update(signatureBaseString);
  return shaObj.getHash("B64");
};

export type RequestData = {
  url: string; // TODO: Restrict to a string in the form of URL only
  method: "GET" | "POST"; // NOTE: The request method will almost always be GET or POST for Twitter API requests.
  params?: Record<string, boolean | number | string>;
  data?: Record<string, boolean | number | string>;
};
export type ConsumerKeys = {
  key: string;
  secret: string;
};
export type AuthenticationTokens = {
  token: string;
  secret: string;
};

// NOTE: Externally, this function is the main and only one used.
export const generateAuthorizationHeader = (
  { method, url, params = {}, data = {} }: RequestData,
  consumerKeys: ConsumerKeys,
  authenticationTokens: AuthenticationTokens
) => {
  const oauthParameters = {
    oauth_consumer_key: consumerKeys.key,
    oauth_nonce: crypto.randomBytes(16).toString("base64"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000), // NOTE: convert units from milliseconds to seconds
    oauth_token: authenticationTokens.token,
    oauth_version: "1.0",
  };
  const oauth_signature = generateSignature(
    createSignatureBaseString(
      method,
      url,
      createParameterString({ ...params, ...data, ...oauthParameters })
    ),
    createSigningKey(consumerKeys.secret, authenticationTokens.secret)
  );

  return (
    "OAuth " +
    Object.entries({ ...oauthParameters, oauth_signature })
      .map(([key, value]) => `${percentEncode(key)}="${percentEncode(value)}"`)
      .join(", ")
  );
};
