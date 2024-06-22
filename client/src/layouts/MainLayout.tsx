import React from "react";
import { Outlet } from "react-router";
import SideBar from "../components/SideBar";

const MainLayout = () => {
  return (
    <main className="flex min-h-screen">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
