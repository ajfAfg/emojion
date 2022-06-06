import { render } from "@testing-library/react";
import { Header } from "@/components/Header";

describe("Header", () => {
  it("contains the title", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Emojion")).toBeTruthy();
  });
});
