import { useDeleteColumnMutation } from "../api/boards/boardsApi";
import Button from "./Button";
import Modal, { ModalProps } from "./Modal";
import Loader from "./Loader";
import { Column } from "../api/boards/dto/GetColumnsDTO";

type DeleteColumnModalProps = ModalProps & {
  column: Column;
};

const DeleteColumnModal = ({
  column,
  ...modalProps
}: DeleteColumnModalProps) => {
  const [triggerDeleteColumn, { isLoading }] = useDeleteColumnMutation();

  const handleClickDeleteColumn = () => {
    triggerDeleteColumn({ boardId: column.board_id, columnId: column.id })
      .unwrap()
      .then(() => modalProps.onClose)
      .catch(() => alert("Oops.. something went wrong"));
  };

  return (
    <Modal {...modalProps}>
      <h3 className="w-boardModal mb-4 text-center text-2xl">
        Do you really want to delete "{column.title}" column?
      </h3>
      <div className="flex flex-col gap-2">
        <Button variant="terciary" size="big" onClick={modalProps.onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="big"
          onClick={handleClickDeleteColumn}
          disabled={isLoading}
        >
          {isLoading ? <Loader variant="button" /> : "Submit"}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteColumnModal;
