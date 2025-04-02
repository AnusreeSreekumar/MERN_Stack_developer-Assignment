import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreatePatient from "../components/CreatePatient";
import { BrowserRouter } from "react-router-dom";

describe("CreatePatient Component", () => {
  it("renders the form and submits patient data", () => {
    render(
      <BrowserRouter>
        <CreatePatient />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Emily Davis" },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: "29" },
    });
    fireEvent.change(screen.getByLabelText(/gender/i), {
      target: { value: "Female" },
    });
    fireEvent.change(screen.getByLabelText(/diagnosis/i), {
      target: { value: "Thyroid Cancer" },
    });
    fireEvent.change(screen.getByLabelText(/treatment plan/i), {
      target: { value: "Surgery" },
    });
    fireEvent.change(screen.getByLabelText(/referred by/i), {
      target: { value: "Dr. John Carter" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/submit/i));

    // Check if the form was submitted
    expect(screen.getByText(/patient created successfully/i)).toBeInTheDocument();
  });
});
