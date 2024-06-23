import clsx from "clsx";
import { Priority } from "../api/boards/dto/GetColumnsDTO";

type PriorityBlockProps = {
  data: Priority;
};

const PriorityBlock = ({ data }: PriorityBlockProps) => {
  const priorityClassName = clsx(
    "inline-block mb-3 px-2 py-2 text-xs rounded-xl",
    {
      "bg-green-200 text-green-700": data.value === 1,
      "bg-yellow-200 text-yellow-700": data.value === 2,
      "bg-red-200 text-red-700": data.value === 3,
    }
  );

  return <span className={priorityClassName}>{data.title}</span>;
};

export default PriorityBlock;
