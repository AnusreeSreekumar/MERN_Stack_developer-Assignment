import React, { useState } from "react";

const Table = () => {
  const [referralType, setReferralType] = useState(""); 
  const [data, setData] = useState([]); 
  const handleSearch = async () => {
    if (!referralType) {
      alert("Please select a referral type!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/selectedpatients?referralType=${referralType}`);
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error("Failed to fetch data:", response.statusText);
        alert("Failed to fetch data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-gray-100 p-8">
      <div className="flex items-center space-x-4 mb-8">
        <label htmlFor="referralType" className="text-lg font-semibold text-gray-700">
          Referral Type:
        </label>
        <select
          id="referralType"
          value={referralType}
          onChange={(e) => setReferralType(e.target.value)}
          className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Referral Type</option>
          <option value="Client">Client</option>
          <option value="Walkin">Walkin</option>
          <option value="Doctor">Doctor</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Proceed/Search
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">S.No</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Patient Id</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Patient Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Referral Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Doctor Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Latest Visit Id</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.patientId}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.patientName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.referredBy}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.doctorName || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.latestVisitId || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;