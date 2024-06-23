import { Subtask } from "../api/tasks/dto/GetOneTaskDTO";
import CheckBox from "./CheckBox";

type SubTaskItemProps = {
  data: Subtask;
};

const SubTaskItem = ({ data }: SubTaskItemProps) => {
  return <CheckBox label={data.title} checked={data.done} />;
};

export default SubTaskItem;
