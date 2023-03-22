import { render } from "@testing-library/react";
import { OgiriPicture } from "..";

describe("OgiriPicture", () => {
  it("renders the Ōgiri picture unchanged", async () => {
    const { container } = render(<OgiriPicture emoji="🥳" text="dummy text" />);
    expect(container).toMatchSnapshot();
  });
});
