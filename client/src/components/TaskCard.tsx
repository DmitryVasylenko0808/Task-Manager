import { Task } from "../api/boards/dto/GetColumnsDTO";
import clsx from "clsx";

type TaskCardProps = {
  data: Task;
};

const TaskCard = ({ data }: TaskCardProps) => {
  const priorityClassName = clsx(
    "inline-block mb-3 px-2 py-2 text-xs rounded-xl",
    {
      "bg-green-200 text-green-700": data.priority.value === 1,
      "bg-yellow-200 text-yellow-700": data.priority.value === 2,
      "bg-red-200 text-red-700": data.priority.value === 3,
    }
  );

  return (
    <li className="block">
      <div className="p-4 bg-white rounded-xl shadow-md">
        <span className={priorityClassName}>{data.priority.title}</span>
        <h4>{data.title}</h4>
      </div>
    </li>
  );
};

export default TaskCard;
