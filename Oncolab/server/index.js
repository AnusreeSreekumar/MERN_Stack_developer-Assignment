import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import patientroute from "./Routes/patientroute.js";
import cors from 'cors';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

const app = express();
const PORT = process.env.PORT 

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use("/", patientroute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

connectDB();