import request from "supertest";
import app from "../index.js"; // Ensure your server is exported in index.js

describe("Patient API", () => {
  it("should create a new patient", async () => {
    const newPatient = {
      name: "Michael Brown",
      age: 50,
      gender: "Male",
      diagnosis: "Prostate Cancer",
      treatmentPlan: "Hormone Therapy",
      contact: {
        phone: "444-987-6543",
        email: "michaelbrown@example.com",
      },
      address: {
        street: "321 Oak St",
        city: "Houston",
        state: "TX",
        zip: "77001",
      },
    };

    const response = await request(app).post("/api/patients").send(newPatient);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Patient created successfully");
  });
});
