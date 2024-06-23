import Button from "./ui/Button";
import { TbPlus } from "react-icons/tb";
import { useModal } from "../hooks/useModal";
import AddBoardModal from "./Modals/AddBoardModal";

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
