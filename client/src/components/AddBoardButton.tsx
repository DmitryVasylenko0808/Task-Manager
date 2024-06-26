import Button from "./ui/Button";
import { TbPlus } from "react-icons/tb";

type AddBoardButtonProps = {
  onClick: () => void;
};

const AddBoardButton = ({ onClick }: AddBoardButtonProps) => {
  return (
    <Button
      size="default"
      className="py-3 inline-flex items-center gap-3"
      onClick={onClick}
    >
      <TbPlus size={24} />
      <span className="text-lg">Add Board</span>
    </Button>
  );
};

export default AddBoardButton;
