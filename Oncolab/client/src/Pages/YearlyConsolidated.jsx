import React, { useState, useEffect } from "react";

const YearlyConsolidatedReport = () => {
  const [selectedDoctorClient, setSelectedDoctorClient] = useState("ALL");
  const [selectedOption, setSelectedOption] = useState("ALL");
  const [financialYear, setFinancialYear] = useState("2025-2026");
  const [reportData, setReportData] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const handleDoctorClientChange = (event) => {
    setSelectedDoctorClient(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleYearChange = (event) => {
    setFinancialYear(event.target.value);
  };

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/yearlyReport?type=${selectedDoctorClient}&reportType=${selectedOption}&year=${financialYear}`
      );
      if (response.ok) {
        const data = await response.json();
        setReportData(data); 
      } else {
        console.error("Failed to fetch data:", response.statusText);
        setReportData([]); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setReportData([]);
    } finally {
      setLoading(false);
    };
  }

  useEffect(() => {
    fetchReportData();
  }, [selectedDoctorClient, selectedOption, financialYear]);

  return (
    <div className="bg-[#d9eaf5] min-h-screen p-6">
      <header className="text-white px-6 py-3 flex justify-around items-center">
        <h1 className="text-lg text-blue-900">Yearly Consolidated Report</h1>
        <div className="flex items-center space-x-4">
          <div>
            <select
              value={selectedDoctorClient}
              onChange={handleDoctorClientChange}
              className="bg-white text-black px-4 py-2 rounded-lg w-56 h-10 border-2 border-blue-900"
            >
              <option value="ALL">Select All</option>
              <option value="DOCTOR">Doctor</option>
              <option value="CLIENT">Client</option>
              <option value="WALKIN">Walkin</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-blue-900 font-medium mb-1">
              Report Type
            </label>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="bg-white text-black px-4 py-2 rounded-lg w-56 h-10 border-2 border-blue-900"
            >
              <option value="ALL">Select All</option>
              <option value="WALKIN">Total</option>
              <option value="DOCTOR">Collection</option>
              <option value="CLIENT">Outstanding</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-blue-900 font-medium mb-1">
              Financial Year
            </label>
            <select
              value={financialYear}
              onChange={handleYearChange}
              className="bg-white text-black px-4 py-2 rounded-lg shadow w-56 h-10 border-2 border-blue-900"
            >
              <option value="2025-2026">2025-2026</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </div>
        </div>
      </header>

      <table className="min-w-full mt-6 border-collapse border border-gray-300">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2">S.No</th>
            <th className="border border-gray-300 px-4 py-2">Referral Name</th>
            {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map(
              (month) => (
                <th key={month} className="border border-gray-300 px-4 py-2">
                  {month}
                </th>
              )
            )}
            <th className="border border-gray-300 px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="15" className="border border-gray-300 px-4 py-2 text-center text-blue-500">
                Loading...
              </td>
            </tr>
          ) : reportData.length > 0 ? (
            reportData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{row.referralName}</td>
                {row.monthlyData.map((data, idx) => (
                  <td key={idx} className="border border-gray-300 px-4 py-2">
                    {data}
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2">{row.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="15" className="border border-gray-300 px-4 py-2 text-center text-red-500">
                No Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-end space-x-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow">
          Export To PDF
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow">
          Export To Excel
        </button>
      </div>

      <footer className="text-center text-sm text-gray-600 mt-6">
        <p>Copyright © 2024. All rights reserved to Caredata Informatics</p>
        <p>Please Call or WhatsApp for Support: +919600052472</p>
      </footer>
    </div>
  );
};

export default YearlyConsolidatedReport;