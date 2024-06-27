import React from "react";
import Boards from "./Boards";
import LogOut from "./LogOut";

const SideBar = () => {
  return (
    <aside className="min-w-80 flex flex-col border-r">
      <div className="flex-1 flex flex-col items-center">
        <div>
          <h1 className="mb-3 py-6 text-3xl text-tm-black-300 font-bold">
            Task Manager App
          </h1>
          <Boards />
        </div>
      </div>
      <LogOut />
    </aside>
  );
};

export default SideBar;
