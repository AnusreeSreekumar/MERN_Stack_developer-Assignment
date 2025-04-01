import React, { Children } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import TopNavbar from "../Components/TopNavbar";
import Table from "../Pages/Table";

const MainLayout = ({ Children }) => {
  return (
    <>
      <Header />
      <TopNavbar />
      <main>
        <Outlet /> 
      </main>
    </>
  );
};

export default MainLayout
