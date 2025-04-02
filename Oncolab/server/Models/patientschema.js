import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const patientSchema = new mongoose.Schema({
  patientId: { type: String, unique: true, default: uuidv4 },
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  address: { type: String, required: true },
  bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },

  visits: [
    {
      visitId: { type: String, default: uuidv4 },
      visitDate: { type: Date, default: Date.now },
      doctorName: String,
      referredBy: { type: String, enum: ["Walkin", "Doctor"] }, 
      testsOrdered: [
        {
          testName: { type: String, required: true }, 
          testCharge: { type: Number, required: true } 
        }
      ],
      technicianAssigned: String,
      sampleCollected: { type: Boolean, default: false },
      sampleMethod: String,
      testStatus: { type: String, enum: ["Pending", "In-Progress", "Completed"], default: "Pending" },
      expectedReportDate: Date,
      
      testResults: [
        {
          testId: { type: String, default: uuidv4 },
          testName: String,
          resultValue: String,
          normalRange: String,
          remarks: String,
          reportFile: String,
          testCompletedDate: Date
        }
      ],

      billing: {
        invoiceId: { type: String, default: uuidv4 },
        totalAmount: Number,
        discount: Number,
        finalAmount: Number,
        paymentMode: { type: String, enum: ["Cash", "Card", "Online", "Insurance"] },
        paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
        receiptId: String
      }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;