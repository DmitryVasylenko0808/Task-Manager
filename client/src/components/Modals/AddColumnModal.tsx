import { z } from "zod";
import { Board } from "../../api/boards/dto/GetBoardsDTO";
import Button from "../ui/Button";
import Modal, { ModalProps } from "../ui/Modal";
import TextField from "../ui/TextField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAddColumnMutation } from "../../api/boards/boardsApi";
import Loader from "../ui/Loader";

type AddColumnModalProps = ModalProps & {
  board: Board;
};

const addColumnSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type AddColumnFormFields = z.infer<typeof addColumnSchema>;

const AddColumnModal = ({ board, ...modalProps }: AddColumnModalProps) => {
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<AddColumnFormFields>({
    resolver: zodResolver(addColumnSchema),
  });

  const [triggerAddColumn, { isLoading }] = useAddColumnMutation();

  useEffect(() => setFocus("title"), []);

  const submitHandler = (data: AddColumnFormFields) => {
    triggerAddColumn({ id: board.id, ...data })
      .unwrap()
      .then(() => modalProps.onClose())
      .catch(() => alert("Oops... something went worng"));
  };

  return (
    <Modal {...modalProps}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <h3 className="w-boardModal mb-4 text-center text-2xl">
          Adding column to board "{board.title}"
        </h3>
        <div className="mb-7">
          <TextField
            {...register("title")}
            label="Title"
            error={errors.title?.message}
          />
        </div>
        <Button size="big" variant="primary" disabled={isLoading}>
          {isLoading ? <Loader variant="button" /> : "Add Column"}
        </Button>
      </form>
    </Modal>
  );
};

export default AddColumnModal;
