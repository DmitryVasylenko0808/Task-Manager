import React from "react";
import { TbPlus } from "react-icons/tb";
import Button from "./ui/Button";
import { useModal } from "../hooks/useModal";
import { useParams } from "react-router";
import AddTaskModal from "./Modals/AddTaskModal";

const AddTaskButton = () => {
  const { boardId } = useParams();
  const addTaskModal = useModal();

  return (
    <>
      <Button size="default" variant="primary" onClick={addTaskModal.onOpen}>
        <TbPlus size={24} />
        Add Task
      </Button>
      {boardId && (
        <AddTaskModal boardId={parseFloat(boardId)} {...addTaskModal} />
      )}
    </>
  );
};

export default AddTaskButton;
