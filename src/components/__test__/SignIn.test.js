import { render, screen } from "@testing-library/react";
import SignIn from "../Auth/SignIn";

describe("Test Sign In Component", () => {
  test("Component must have two buttons", async () => {
    render(<SignIn />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(2);
  });
});
