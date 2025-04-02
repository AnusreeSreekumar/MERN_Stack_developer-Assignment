import { useState, useEffect } from "react";

function CreatePatient() {
  const [patientDetails, setPatientDetails] = useState({
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    bloodGroup: "",
    referredBy: "",
    doctorName: "",
    testsOrdered: [], 
    totalAmount: 0,
    discount: 0,
    netAmount: 0, 
    paymentMode: "",
  });

  const [testDetails, setTestDetails] = useState({ testName: "", testCharge: "" });
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const paymentModes = ["Cash", "Card", "UPI", "Net Banking"];

  // Auto-calculate totalAmount and netAmount whenever testsOrdered or discount changes
  useEffect(() => {
    const total = patientDetails.testsOrdered.reduce(
      (sum, test) => sum + parseFloat(test.testCharge || 0),
      0
    );
    const net = total - parseFloat(patientDetails.discount || 0);
    setPatientDetails((prev) => ({
      ...prev,
      totalAmount: total,
      netAmount: net > 0 ? net : 0, // Ensure netAmount is not negative
    }));
  }, [patientDetails.testsOrdered, patientDetails.discount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleReferredByChange = (e) => {
    const value = e.target.value;
    setPatientDetails((prev) => ({
      ...prev,
      referredBy: value,
      doctorName: value === "Doctor" ? prev.doctorName : "", // Clear doctorName if "Walkin" is selected
    }));
  };

  const handleTestDetailsChange = (e) => {
    const { name, value } = e.target;
    setTestDetails({ ...testDetails, [name]: value });
  };

  const addLabTest = () => {
    if (testDetails.testName && testDetails.testCharge) {
      setPatientDetails((prev) => ({
        ...prev,
        testsOrdered: [...prev.testsOrdered, testDetails],
      }));
      setTestDetails({ testName: "", testCharge: "" }); // Reset test details input
    } else {
      alert("Please fill in both test name and charge.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Entered Data",patientDetails);
      
      const response = await fetch("http://localhost:3000/addbills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Patient record submitted successfully:", data);
        alert("Patient record submitted successfully!");
        setPatientDetails({
          patientName: "",
          age: "",
          gender: "",
          phone: "",
          email: "",
          address: "",
          bloodGroup: "",
          referredBy: "",
          doctorName: "",
          testsOrdered: [],
          totalAmount: 0,
          discount: 0,
          netAmount: 0,
          paymentMode: "",
        });
      } else {
        console.error("Failed to submit patient record:", response.statusText);
        alert("Failed to submit patient record. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting patient record:", error);
      alert("An error occurred while submitting the patient record. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Create Patient Record
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Details */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Patient Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="patientName"
              value={patientDetails.patientName}
              onChange={handleChange}
              placeholder="Patient Name"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              name="age"
              value={patientDetails.age}
              onChange={handleChange}
              placeholder="Age"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="gender"
              value={patientDetails.gender}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="phone"
              value={patientDetails.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={patientDetails.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="address"
              value={patientDetails.address}
              onChange={handleChange}
              placeholder="Address"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="bloodGroup"
              value={patientDetails.bloodGroup}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Referral Details */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Referral Details</h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="referredBy"
                value="Walkin"
                checked={patientDetails.referredBy === "Walkin"}
                onChange={handleReferredByChange}
                className="focus:ring-2 focus:ring-blue-500"
              />
              <span>Walkin</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="referredBy"
                value="Doctor"
                checked={patientDetails.referredBy === "Doctor"}
                onChange={handleReferredByChange}
                className="focus:ring-2 focus:ring-blue-500"
              />
              <span>Doctor</span>
            </label>
            {patientDetails.referredBy === "Doctor" && (
              <input
                type="text"
                name="doctorName"
                value={patientDetails.doctorName}
                onChange={handleChange}
                placeholder="Doctor Name"
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            )}
          </div>
        </div>

        {/* Lab Tests */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Lab Tests</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="testName"
              value={testDetails.testName}
              onChange={handleTestDetailsChange}
              placeholder="Test Name"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="testCharge"
              value={testDetails.testCharge}
              onChange={handleTestDetailsChange}
              placeholder="Test Charge"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addLabTest}
              className="col-span-2 bg-blue-500 text-white py-2 rounded-lg hover:opacity-90"
            >
              Add Test
            </button>
          </div>
          <ul className="mt-4">
            {patientDetails.testsOrdered.map((test, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{test.testName}</span>
                <span>${test.testCharge}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Billing Details */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Billing Details</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              name="totalAmount"
              value={patientDetails.totalAmount}
              onChange={handleChange}
              placeholder="Total Amount"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled // Auto-calculated
            />
            <input
              type="number"
              name="discount"
              value={patientDetails.discount}
              onChange={handleChange}
              placeholder="Discount"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="netAmount"
              value={patientDetails.netAmount}
              onChange={handleChange}
              placeholder="Net Amount"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled // Auto-calculated
            />
            <select
              name="paymentMode"
              value={patientDetails.paymentMode}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Payment Mode</option>
              {paymentModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-md hover:opacity-90 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePatient;