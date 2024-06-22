import { useNavigate } from "react-router";
import { useDeleteBoardMutation } from "../api/boards/boardsApi";
import { Board } from "../api/boards/dto/GetBoardsDTO";
import Button from "./Button";
import Modal, { ModalProps } from "./Modal";
import Loader from "./Loader";

type DeleteBoardModalProps = ModalProps & {
  board: Board;
};

const DeleteBoardModal = ({ board, ...modalProps }: DeleteBoardModalProps) => {
  const navigate = useNavigate();

  const [triggerDeleteBoard, { isLoading }] = useDeleteBoardMutation();

  const handleClickDeleteBoard = () => {
    triggerDeleteBoard(board.id)
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch(() => alert("Oops.. something went wrong"));
  };

  return (
    <Modal {...modalProps}>
      <h3 className="w-boardModal mb-4 text-center text-2xl">
        Do you really want to delete "{board.title}" board?
      </h3>
      <div className="flex flex-col gap-2">
        <Button variant="terciary" size="big" onClick={modalProps.onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="big"
          onClick={handleClickDeleteBoard}
          disabled={isLoading}
        >
          {isLoading ? <Loader variant="button" /> : "Submit"}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteBoardModal;
