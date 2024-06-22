import React from "react";
import Button from "./Button";
import { TbLogout2 } from "react-icons/tb";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
  const { logOut } = useAuth();

  return (
    <div className="mb-auto py-5 px-7 border-t">
      <Button size="default" variant="terciary" onClick={logOut}>
        <TbLogout2 size={32} />
        <span className="text-lg">Log out</span>
      </Button>
    </div>
  );
};

export default LogOut;
