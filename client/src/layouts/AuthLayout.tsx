import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="mb-16 text-center text-3xl text-tm-black-300 font-bold">
        Task Manager App
      </h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
