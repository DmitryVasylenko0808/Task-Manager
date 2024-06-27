import { number, z } from "zod";
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
import {
  useEditTaskMutation,
  useGetOneTaskQuery,
} from "../../api/tasks/tasksApi";
import Loader from "../ui/Loader";
import { useEffect } from "react";

const subtasksSchema = z.object({
  id: z.number().optional(),
  task_id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  done: z.boolean().optional(),
});

const editTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  columnId: z.string({ required_error: "Choose a column" }),
  priorityId: z.string({ required_error: "Choose a priority" }),
  subtasks: z.array(subtasksSchema),
});

type EditTaskFormFields = z.infer<typeof editTaskSchema>;

type EditTaskModalProps = ModalProps & { boardId: number; taskId: number };

const EditTaskModal = ({
  boardId,
  taskId,
  ...modalProps
}: EditTaskModalProps) => {
  const { data: priorities } = useGetPrioritiesQuery(undefined, {
    skip: !modalProps.open,
  });
  const { data: columns } = useGetColumnsQuery(boardId, {
    skip: !modalProps.open,
  });
  const {
    data: task,
    isLoading: isLoadingTask,
    isError,
  } = useGetOneTaskQuery(taskId, {
    skip: !modalProps.open,
  });
  const [triggerEditTask, { isLoading }] = useEditTaskMutation();

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditTaskFormFields>({
    values: {
      title: task?.title || "",
      description: task?.description || "",
      columnId: task?.column_id.toString() || "",
      priorityId: task?.priority_id.toString() || "",
      subtasks: task?.subtasks || [],
    },
    resolver: zodResolver(editTaskSchema),
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

  const submitHandler = (data: EditTaskFormFields) => {
    if (task) {
      const subtasksItems = data.subtasks.map((s) => {
        if (task) {
        }
        const { task_id, ...otherData } = s;

        return otherData;
      });

      const sendData = {
        ...data,
        id: task.id,
        columnId: parseFloat(data.columnId),
        priorityId: parseFloat(data.priorityId),
        subtasks: subtasksItems,
      };

      triggerEditTask(sendData)
        .unwrap()
        .catch((err) => alert(err.data.message));
    }
  };

  const isDisabledButton = isLoadingTask || isError || isLoading;

  return (
    <Modal {...modalProps}>
      <form className="w-boardModal" onSubmit={handleSubmit(submitHandler)}>
        <h3 className="mb-4 text-center text-2xl">Editing Task</h3>
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
                {...register(`subtasks.${index}.title`)}
                label={`Subtask ${index + 1}`}
                key={field.id}
                error={
                  errors.subtasks && errors.subtasks[index]?.title?.message
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
            onClick={() => append({ title: "", done: false })}
          >
            Add Subtask
          </Button>
          <Button
            type="submit"
            size="big"
            variant="primary"
            disabled={isDisabledButton}
          >
            {isLoading ? <Loader variant="button" /> : "Edit Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
