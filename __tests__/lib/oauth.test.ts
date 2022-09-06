import {
  createParameterString,
  createSignatureBaseString,
  createSigningKey,
  generateAuthorizationHeader,
  generateSignature,
} from "@/lib/oauth";

describe("createParameterString", () => {
  it("create a parameter string correctly", async () => {
    const parameters = {
      status: "Hello Ladies + Gentlemen, a signed OAuth request!",
      include_entities: true,
      oauth_consumer_key: "xvz1evFS4wEEPTGEFPHBog",
      oauth_nonce: "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: 1318622958,
      oauth_token: "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
      oauth_version: "1.0",
    };
    expect(createParameterString(parameters)).toBe(
      "include_entities=true&oauth_consumer_key=xvz1evFS4wEEPTGEFPHBog&oauth_nonce=kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1318622958&oauth_token=370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb&oauth_version=1.0&status=Hello%20Ladies%20%2B%20Gentlemen%2C%20a%20signed%20OAuth%20request%21"
    );
  });
});

describe("createSignatureBaseString", () => {
  it("create a signature base string correctly", async () => {
    const httpMethod = "POST";
    const baseURL = "https://api.twitter.com/1.1/statuses/update.json";
    const parameterString =
      "include_entities=true&oauth_consumer_key=xvz1evFS4wEEPTGEFPHBog&oauth_nonce=kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1318622958&oauth_token=370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb&oauth_version=1.0&status=Hello%20Ladies%20%2B%20Gentlemen%2C%20a%20signed%20OAuth%20request%21";
    expect(
      createSignatureBaseString(httpMethod, baseURL, parameterString)
    ).toBe(
      "POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&include_entities%3Dtrue%26oauth_consumer_key%3Dxvz1evFS4wEEPTGEFPHBog%26oauth_nonce%3DkYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1318622958%26oauth_token%3D370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb%26oauth_version%3D1.0%26status%3DHello%2520Ladies%2520%252B%2520Gentlemen%252C%2520a%2520signed%2520OAuth%2520request%2521"
    );
  });
});

describe("createSigningKey", () => {
  it("create a signing key correctly", async () => {
    const consumerSecret = "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw";
    const oauthTokenSecret = "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE";
    expect(createSigningKey(consumerSecret, oauthTokenSecret)).toBe(
      "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw&LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE"
    );
  });
});

describe("generateSignature", () => {
  it("generate a signature", async () => {
    const signatureBaseString =
      "POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&include_entities%3Dtrue%26oauth_consumer_key%3Dxvz1evFS4wEEPTGEFPHBog%26oauth_nonce%3DkYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1318622958%26oauth_token%3D370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb%26oauth_version%3D1.0%26status%3DHello%2520Ladies%2520%252B%2520Gentlemen%252C%2520a%2520signed%2520OAuth%2520request%2521";
    const signingKey =
      "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw&LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE";
    expect(generateSignature(signatureBaseString, signingKey)).toBe(
      "hCtSmYh+iHYCEqBWrE7C7hYmtUk="
    );
  });
});

describe("generateAuthorizationHeader", () => {
  const authorization = generateAuthorizationHeader(
    {
      url: "https://api.twitter.com/1.1/statuses/update.json",
      method: "POST",
      params: { include_entities: true },
      data: { status: "Hello Ladies + Gentlemen, a signed OAuth request!" },
    },
    {
      key: "xvz1evFS4wEEPTGEFPHBog",
      secret: "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw",
    },
    {
      token: "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
      secret: "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE",
    }
  );

  it('has "OAuth " at the begining', async () => {
    expect(authorization.slice(0, 6)).toBe("OAuth ");
  });

  it("has all necessary parameters", async () => {
    expect(
      authorization
        .slice(6)
        .split(", ")
        .map((s) => s.split("=")[0])
        .sort()
    ).toEqual(
      [
        "oauth_consumer_key",
        "oauth_nonce",
        "oauth_signature",
        "oauth_signature_method",
        "oauth_timestamp",
        "oauth_token",
        "oauth_version",
      ].sort()
    );
  });
});
