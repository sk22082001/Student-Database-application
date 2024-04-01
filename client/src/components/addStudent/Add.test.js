/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Add from "./Add";


describe("<Add />", () => {

  it("renders without crashing", () => {
    render(
      <Router>
        <Add />
      </Router>
    );
    expect(screen.getByText("Student Enrollment Form")).toBeInTheDocument();
  });
});
