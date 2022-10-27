import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../Auth/SignIn";

describe("Test Sign In Component", () => {
  test("Component must have two buttons", async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(2);
  });
  test("Component must have two inputs", async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
    const inputList = await screen.findAllByRole("input");
    expect(inputList).toHaveLength(2);
  });
});
