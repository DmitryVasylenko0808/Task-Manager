import React from "react";
import Boards from "./Boards";
import LogOut from "./LogOut";

const SideBar = () => {
  return (
    <aside className="flex flex-col border-r">
      <div className="px-7 flex-1 flex flex-col">
        <h1 className="mb-3 py-6 text-3xl text-tm-black-300 font-bold">
          Task Manager App
        </h1>
        <Boards />
      </div>
      <LogOut />
    </aside>
  );
};

export default SideBar;
