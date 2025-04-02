import express from "express";
import Patient from "../Models/patientschema.js";
import moment from "moment";

const patientroute = express.Router();

patientroute.post("/addbills", async (req, res) => {
  try {
    const {
      patientName,
      age,
      gender,
      phone,
      email,
      address,
      bloodGroup,
      referredBy,
      doctorName,
      testsOrdered,
      totalAmount,
      discount,
      netAmount,
      paymentMode,
    } = req.body;

    const newVisit = {
      visitId: `visit-${Date.now()}`,
      visitDate: new Date(),
      referredBy,
      doctorName,
      testsOrdered,
      billing: {
        totalAmount,
        discount,
        finalAmount: netAmount,
        paymentMode,
        paymentStatus: "Completed",
      },
    };

    let patient = await Patient.findOne({ patientName });

    if (patient) {
      patient.visits.push(newVisit);
      await patient.save();
      res
        .status(200)
        .json({ message: "Visit added to existing patient", patient });
    } else {
      const newPatient = new Patient({
        patientName,
        age,
        gender,
        phone,
        email,
        address,
        bloodGroup,
        visits: [newVisit],
      });

      const savedPatient = await newPatient.save();
      res.status(201).json({
        message: "New patient created with visit",
        patient: savedPatient,
      });
    }
  } catch (error) {
    console.error("Error adding patient record:", error);
    res
      .status(500)
      .json({ message: "Failed to add patient record", error: error.message });
  }
});

patientroute.get("/getpatients", async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Failed to fetch patients" });
  }
});

patientroute.get("/selectedpatients", async (req, res) => {
  try {
    const { referralType } = req.query;

    const patients = await Patient.find();

    const result = patients.flatMap((patient) =>
      patient.visits
        .filter((visit) => !referralType || visit.referredBy === referralType)
        .map((visit) => ({
          patientId: patient.patientId,
          patientName: patient.patientName,
          referredBy: visit.referredBy,
          doctorName: visit.doctorName || "N/A",
          latestVisitId: visit.visitId,
        }))
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Failed to fetch patients" });
  }
});

patientroute.get("/yearlyReport", async (req, res) => {
  const { type, reportType, year } = req.query;

  try {
    const query = {};

    if (type && type !== "ALL") {
      query.type = type;
    }

    if (reportType && reportType !== "ALL") {
      query.reportType = reportType;
    }

    if (year) {
      query.year = year;
    }

    const data = await YearlyReport.find(query);

    const formattedData = data.map((item) => ({
      referralName: item.referralName,
      monthlyData: item.monthlyData,
      total: item.total,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching yearly report:", error);
    res.status(500).json({ message: "Failed to fetch yearly report" });
  }
});

patientroute.get("/billTransactions", async (req, res) => {
  const { referredBy, dateRange } = req.query;

  const query = {};

  if (referredBy && referredBy !== "ALL") {
    query.visits = { $elemMatch: { referredBy: referredBy } };
  }

  if (dateRange) {
    let startDate, endDate;

    if (dateRange === "Today") {
      startDate = moment().startOf("day").toDate();
      endDate = moment().endOf("day").toDate();
    } else if (dateRange === "This Week") {
      startDate = moment().startOf("week").toDate();
      endDate = moment().endOf("week").toDate();
    } else if (dateRange === "This Month") {
      startDate = moment().startOf("month").toDate();
      endDate = moment().endOf("month").toDate();
    } else if (dateRange === "This Year") {
      startDate = moment().startOf("year").toDate();
      endDate = moment().endOf("year").toDate();
    }

    if (startDate && endDate) {
      query.visits = query.visits || {};
      query.visits.$elemMatch = {
        ...query.visits.$elemMatch,
        visitDate: { $gte: startDate, $lte: endDate },
      };
    }
  }

  console.log("Final Query Object:", JSON.stringify(query, null, 2));

  try {
    const data = await Patient.find(query);
    console.log("Fetched Data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching bill transactions:", error);
    res.status(500).json({ message: "Failed to fetch bill transactions" });
  }
});

export default patientroute;
