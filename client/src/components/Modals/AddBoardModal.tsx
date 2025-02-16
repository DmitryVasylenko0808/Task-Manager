import { useEffect } from "react";
import Modal, { ModalProps } from "../ui/Modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBoardMutation } from "../../api/boards/boardsApi";
import TextField from "../ui/TextField";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

const addBoardSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type AddBoardFormFields = z.infer<typeof addBoardSchema>;

type AddBoardModalProps = ModalProps;

const AddBoardModal = (modalProps: AddBoardModalProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBoardFormFields>({
    resolver: zodResolver(addBoardSchema),
  });

  const [triggerAddBoard, { isLoading }] = useCreateBoardMutation();

  const submitHandler = (data: AddBoardFormFields) => {
    triggerAddBoard(data)
      .unwrap()
      .then(() => modalProps.onClose())
      .catch(() => alert("Oops... something went wrong"));
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [modalProps.open]);

  return (
    <Modal {...modalProps}>
      <form className="w-boardModal" onSubmit={handleSubmit(submitHandler)}>
        <h3 className="mb-4 text-center text-2xl">Creating Board</h3>
        <div className="mb-7">
          <TextField
            {...register("title")}
            label="Title"
            error={errors.title?.message}
          />
        </div>
        <div className="flex justify-end gap-x-3">
          <Button
            type="submit"
            variant="primary"
            size="big"
            disabled={isLoading}
          >
            {isLoading ? <Loader variant="button" /> : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBoardModal;
