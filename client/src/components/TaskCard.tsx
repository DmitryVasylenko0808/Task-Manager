import { Task } from "../api/boards/dto/GetColumnsDTO";
import { useDrawer } from "../hooks/useDrawer";
import TaskDrawer from "./TaskDrawer";
import PriorityBlock from "./PriorityBlock";

type TaskCardProps = {
  data: Task;
};

const TaskCard = ({ data }: TaskCardProps) => {
  const taskDrawer = useDrawer();

  return (
    <li className="block">
      <div className="p-4 bg-white rounded-xl shadow-md">
        <PriorityBlock data={data.priority} />
        <h4 className="cursor-pointer" onClick={taskDrawer.onOpen}>
          {data.title}
        </h4>
      </div>
      <TaskDrawer taskId={data.id} {...taskDrawer} />
    </li>
  );
};

export default TaskCard;
