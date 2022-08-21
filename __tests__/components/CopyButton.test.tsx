import { CopyButton } from "@/components/CopyButton";
import { render, fireEvent } from "@testing-library/react";

describe("CopyButton", () => {
  it("executes the function `onClick` on click", async () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<CopyButton onClick={handleClick} />);
    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("displays the tooltip on click", async () => {
    const { getByRole, getByTestId } = render(
      <CopyButton onClick={() => {}} />
    );
    fireEvent.click(getByRole("button"));
    // TODO:
    // If it takes a long time after clicking to see the behavior,
    // this test may possibly fail.
    expect(getByTestId("copied")).toBeTruthy();
  });
});
