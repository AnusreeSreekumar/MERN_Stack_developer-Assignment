import React, { useState, useEffect } from "react";

const BillTransactionReport = () => {
  const [referredBy, setReferredBy] = useState("ALL");
  const [dateRange, setDateRange] = useState("Today");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleReferredByChange = (event) => {
    setReferredBy(event.target.value);
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/billTransactions?referredBy=${referredBy}&dateRange=${dateRange}`
      );
      if (response.ok) {
        const data = await response.json();
        setTableData(data);
      } else {
        console.error("Failed to fetch data:", response.statusText);
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [referredBy, dateRange]);

  return (
    <div className="bg-[#d9eaf5] min-h-screen p-6">
      <header className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="text-lg">Oncolab Diagnostics LLC</h1>
        <div className="flex items-center space-x-4">
          <button
            className="bg-white text-blue-900 px-4 py-2 rounded shadow"
            onClick={fetchTableData}
          >
            Refresh
          </button>
          <span>THOMAS</span>
        </div>
      </header>

      <div className="bg-white p-4 shadow mt-4">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Range</label>
            <select
              value={dateRange}
              onChange={handleDateRangeChange}
              className="bg-white text-black px-4 py-2 rounded-lg w-56 border-2 border-gray-300"
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="This Year">This Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Referred Type</label>
            <select
              value={referredBy}
              onChange={handleReferredByChange}
              className="bg-white text-black px-4 py-2 rounded-lg w-56 border-2 border-gray-300"
            >
              <option value="ALL">Select All</option>
              <option value="Walkin">Walkin</option>
              <option value="Doctor">Doctor</option>
              <option value="Client">Client</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium text-blue-900">Bill Transaction MIS Report</h2>
        <table className="min-w-full mt-4 border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">S.No</th>
              <th className="border border-gray-300 px-4 py-2">Receipt Number</th>
              <th className="border border-gray-300 px-4 py-2">Patient Name</th>
              <th className="border border-gray-300 px-4 py-2">Client Name</th>
              <th className="border border-gray-300 px-4 py-2">Visit Date</th>
              <th className="border border-gray-300 px-4 py-2">Visit ID</th>
              <th className="border border-gray-300 px-4 py-2">Gross Amount</th>
              <th className="border border-gray-300 px-4 py-2">Discount</th>
              <th className="border border-gray-300 px-4 py-2">Net Amount</th>
              <th className="border border-gray-300 px-4 py-2">Paid Amount</th>
              <th className="border border-gray-300 px-4 py-2">Due Amount</th>
              <th className="border border-gray-300 px-4 py-2">Mode of Payment</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="12" className="border border-gray-300 px-4 py-2 text-center text-blue-500">
                  Loading...
                </td>
              </tr>
            ) : tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.receiptNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.patientName}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.clientName}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(row.visitDate).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.visitID}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.grossAmount}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.discount}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.netAmount}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.paidAmount}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.dueAmount}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.modeOfPayment}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="border border-gray-300 px-4 py-2 text-center text-red-500">
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

export default BillTransactionReport;