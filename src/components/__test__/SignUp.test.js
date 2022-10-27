import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../Auth/SignUp";

describe("Test Sign In Component", () => {
  test("Component must have two buttons", async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(2);
  });
  test("Component must have three inputs", async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    const inputList = await screen.findAllByRole("input");
    expect(inputList).toHaveLength(3);
  });
});
