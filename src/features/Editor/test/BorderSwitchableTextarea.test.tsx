import { BorderSwitchableTextarea } from "../components/BorderSwitchableTextarea";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// NOTE: C.f. https://github.com/vercel/next.js/issues/7479#issuecomment-533657701
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("BorderSwitchableTextarea", () => {
  it("has non-border style when typed", async () => {
    const { getByTestId } = render(<BorderSwitchableTextarea />);
    const textarea = getByTestId("non-border");
    fireEvent.change(textarea, { target: { value: "foo" } });
    expect(textarea).toHaveClass("border-none");
  });
});
