import { findAllByRole, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EditLeave from "../Leaves/EditLeave";

describe("Test Create Leave Component", () => {
  test("Must have 5 buttons", async () => {
    render(
      <BrowserRouter>
        <EditLeave />
      </BrowserRouter>
    );
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(5);
  });
  test("Must have 1 input field", async () => {
    render(
      <BrowserRouter>
        <EditLeave />
      </BrowserRouter>
    );
    const inputList = await screen.findAllByRole("input");
    expect(inputList).toHaveLength(1);
  });
});
