import React from "react";

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto m-52">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2">S.No</th>
            <th className="border border-gray-300 px-4 py-2">Patient Id</th>
            <th className="border border-gray-300 px-4 py-2">Patient Name</th>
            <th className="border border-gray-300 px-4 py-2">Gender</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Doctor Name</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.patientId}</td>
                <td className="border border-gray-300 px-4 py-2">{item.patientName}</td>
                <td className="border border-gray-300 px-4 py-2">{item.gender}</td>
                <td className="border border-gray-300 px-4 py-2">{item.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{item.doctorName}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    item.status === "Active" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7" 
                className="border border-gray-300 px-4 py-2 text-center text-red-500"
              >
                No Record Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;