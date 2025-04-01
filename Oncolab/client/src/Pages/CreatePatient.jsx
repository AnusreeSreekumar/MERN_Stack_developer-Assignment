import { useState } from "react";

function CreatePatientForm() {
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    bloodGroup: "",
    doctorname: "",
    emergencyContact: {
      name: "",
      phone: "",
      relation: "",
    },
    medicalHistory: "",
    allergies: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails({
      ...patientDetails,
      emergencyContact: { ...patientDetails.emergencyContact, [name]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(patientDetails);
    alert("Patient details submitted successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Create Patient Record
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Details */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Patient Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={patientDetails.name}
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
              required
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="doctorname"
              value={patientDetails.doctorname}
              onChange={handleChange}
              placeholder="Doctor Name"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Emergency Contact
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              value={patientDetails.emergencyContact.name}
              onChange={handleEmergencyContactChange}
              placeholder="Contact Name"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="phone"
              value={patientDetails.emergencyContact.phone}
              onChange={handleEmergencyContactChange}
              placeholder="Contact Phone"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="relation"
              value={patientDetails.emergencyContact.relation}
              onChange={handleEmergencyContactChange}
              placeholder="Relation"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Medical History & Allergies */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Additional Information
          </h3>
          <textarea
            name="medicalHistory"
            value={patientDetails.medicalHistory}
            onChange={handleChange}
            placeholder="Medical History"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <textarea
            name="allergies"
            value={patientDetails.allergies}
            onChange={handleChange}
            placeholder="Allergies"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-3"
          ></textarea>
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

export default CreatePatientForm;
