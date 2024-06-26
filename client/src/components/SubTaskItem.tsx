import { Subtask } from "../api/tasks/dto/GetOneTaskDTO";
import { useToggleSubTaskMutation } from "../api/tasks/tasksApi";
import CheckBox from "./ui/CheckBox";

type SubTaskItemProps = {
  data: Subtask;
};

const SubTaskItem = ({ data }: SubTaskItemProps) => {
  const { task_id, id, title, done } = data;

  const [triggerToggleSubtask] = useToggleSubTaskMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;

    triggerToggleSubtask({ id: task_id, subtaskId: id, value })
      .unwrap()
      .catch(() => alert("Oops... something went wrong"));
  };

  return <CheckBox label={title} checked={done} onChange={handleChange} />;
};

export default SubTaskItem;
