import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePatient from "./Pages/CreatePatient";
import MainLayout from "./layouts/MainLayout";
import Table from "./Pages/Table";
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Table />} />
          <Route path="/newPatient" element={<CreatePatient />} />
          <Route path="*" element={<NotFound />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
