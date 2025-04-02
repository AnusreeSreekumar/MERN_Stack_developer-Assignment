import React, { useState } from "react";
import { FaBars, FaBell, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import avatar from "../assets/avatar.png";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-blue-200">
      <header className="bg-[#81BFDA] text-white flex justify-between items-center px-6 py-3 shadow-md">
        <div className="flex items-center space-x-4">
          <button className="text-xl" onClick={() => setIsSidebarOpen(true)}>
            <FaBars />
          </button>
          <img src={logo} alt="Oncolab Diagnostics" className="h-10" />
          <h1 className="text-lg font-semibold">Oncolab Diagnostics LLC</h1>
        </div>

        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium">ACCOUNTS1 / RIDER TRACKING</span>

          <div className="relative">
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-2 rounded-full">
              19
            </span>
            <FaBell className="text-xl cursor-pointer" />
          </div>

          <div className="flex items-center space-x-2">
            <img
              src={avatar}
              alt="User"
              className="h-8 w-8 rounded-full border-2 border-white"
            />
            <span className="font-medium">THOMAS</span>
          </div>
        </div>
      </header>

      {isSidebarOpen && (
        <div
          className="fixed top-16 left-0 h-full w-64 bg-[#0d5c88] text-white shadow-lg p-5 z-50"
          onMouseLeave={() => setIsSidebarOpen(false)} // Close sidebar on mouse leave
        >
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-2xl"
          >
            <FaTimes />
          </button>

          <h2 className="text-lg font-semibold mb-4">Primary Menu</h2>

          <nav className="space-y-3">
            <button
              className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
              onClick={() => navigate("/")}
            >
              Rider Tracking
            </button>
            <button className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700">
              Workstation Master
            </button>
            <button
              className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
              onClick={() => navigate("/yearlyConsolidated")}
            >
              Yearly Consolidated Report
            </button>
            <div>
              <h3 className="text-sm font-semibold mt-4 mb-2">Financial MIS Reports</h3>
              <button
                className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
                onClick={() => navigate("/billTransaction")}
              >
                Bill Transaction Report
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Header;