import { z } from "zod";
import Modal, { ModalProps } from "../ui/Modal";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetPrioritiesQuery } from "../../api/priorities/prioritiesApi";
import { useGetColumnsQuery } from "../../api/boards/boardsApi";
import TextField from "../ui/TextField";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import Select from "../ui/Select";
import { CgClose } from "react-icons/cg";
import { useCreateTaskMutation } from "../../api/tasks/tasksApi";
import Loader from "../ui/Loader";
import { useEffect } from "react";

const subtasksSchema = z.object({
  value: z.string().min(1, "Value is required"),
});

const addTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  columnId: z.string({ required_error: "Choose a column" }),
  priorityId: z.string({ required_error: "Choose a priority" }),
  subtasks: z.array(subtasksSchema),
});

type AddTaskFormFields = z.infer<typeof addTaskSchema>;

type AddTaskModalProps = ModalProps & { boardId: number };

const AddTaskModal = ({ boardId, ...modalProps }: AddTaskModalProps) => {
  const { data: priorities } = useGetPrioritiesQuery(undefined, {
    skip: !modalProps.open,
  });
  const { data: columns } = useGetColumnsQuery(boardId, {
    skip: !modalProps.open,
  });
  const [triggerCreateTask, { isLoading }] = useCreateTaskMutation();

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddTaskFormFields>({
    defaultValues: {
      subtasks: [{ value: "" }],
    },
    resolver: zodResolver(addTaskSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [modalProps.open]);

  const submitHandler = (data: AddTaskFormFields) => {
    triggerCreateTask({
      ...data,
      priorityId: parseFloat(data.priorityId),
      columnId: parseFloat(data.columnId),
      subtasks: data.subtasks.map((s) => s.value),
    })
      .unwrap()
      .catch((err) => alert(err.data.message));
  };

  return (
    <Modal {...modalProps}>
      <form className="w-boardModal" onSubmit={handleSubmit(submitHandler)}>
        <h3 className="mb-4 text-center text-2xl">Adding Task</h3>
        <div className="mb-7 flex flex-col gap-3">
          <TextField
            {...register("title")}
            label="Title"
            error={errors.title?.message}
          />
          <TextArea
            {...register("description")}
            label="Description"
            error={errors.description?.message}
            rows={3}
          />
          <Select
            {...register("columnId")}
            label="Column"
            options={columns || []}
            error={errors.columnId?.message}
          />
          <Select
            {...register("priorityId")}
            label="Priority"
            options={priorities || []}
            error={errors.priorityId?.message}
          />
          {fields.map((field, index) => (
            <div className="flex items-center gap-2" key={field.id}>
              <TextField
                {...register(`subtasks.${index}.value`)}
                label={`Subtask ${index + 1}`}
                key={field.id}
                error={
                  errors.subtasks && errors.subtasks[index]?.value?.message
                }
              />
              <Button
                type="button"
                size="default"
                variant="terciary"
                className="p-0"
                onClick={() => remove(index)}
              >
                <CgClose size={24} />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            size="big"
            variant="terciary"
            onClick={() => append({ value: "" })}
          >
            Add Subtask
          </Button>
          <Button
            type="submit"
            size="big"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? <Loader variant="button" /> : "Add Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
