import { percentEncode } from "@/lib/encode";

describe("percentEncode", () => {
  it("can encode correctly", async () => {
    const testCases = [
      ["Ladies + Gentlemen", "Ladies%20%2B%20Gentlemen"],
      ["An encoded string!", "An%20encoded%20string%21"],
      ["Dogs, Cats & Mice", "Dogs%2C%20Cats%20%26%20Mice"],
      ["☃", "%E2%98%83"],
      ["-_.!~*'()", "-_.%21~%2A%27%28%29"],
    ];
    testCases.forEach(([original, encoded]) =>
      expect(percentEncode(original)).toBe(encoded)
    );
  });
});
