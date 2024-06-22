import React, { useState } from "react";
import Button from "./Button";
import { TbPlus } from "react-icons/tb";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import AddBoardModal from "./AddBoardModal";

const AddBoardButton = () => {
  const modal = useModal();

  return (
    <>
      <Button
        size="default"
        className="py-3 inline-flex items-center gap-3"
        onClick={modal.onOpen}
      >
        <TbPlus size={24} />
        <span className="text-lg">Add Board</span>
      </Button>
      {modal.open && <AddBoardModal {...modal} />}
    </>
  );
};

export default AddBoardButton;
