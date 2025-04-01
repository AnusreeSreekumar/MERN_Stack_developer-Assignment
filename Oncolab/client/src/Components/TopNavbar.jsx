import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSave,
  FaPrint,
  FaEnvelope,
  FaBrush,
  FaRedo,
  FaTruck,
  FaDownload,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";

const Toolbar = () => {
  const navigate = useNavigate();

  const handleClick = (label) => {
    console.log(`Button clicked: ${label}`);
    if (label === "Create") {
      navigate("/newPatient"); 
    } else if (label === "Close") {
      navigate(-1); 
    }
  };

  return (
    <div className="bg-blue-500 text-white flex items-center justify-center px-4 shadow-md relative">
      <div className="flex items-center">
        {[
          { icon: FaPlus, label: "Create" },
          { icon: FaSave, label: "Save" },
          { icon: FaPrint, label: "Print" },
          { icon: FaEnvelope, label: "Email" },
          { icon: FaBrush, label: "Clear" },
          { icon: FaRedo, label: "Refresh" },
          { icon: FaTruck, label: "Dispatch" },
          { icon: FaDownload, label: "Fetch" },
          { icon: FaExclamationCircle, label: "Issues" },
          { icon: FaTimes, label: "Close" },
        ].map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center text-sm px-4 py-2 hover:opacity-100 transition opacity-60"
            onClick={() => handleClick(item.label)}
          >
            <item.icon className="text-lg" />
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;