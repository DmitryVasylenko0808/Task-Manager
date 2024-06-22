import { Column } from "../api/boards/dto/GetColumnsDTO";
import TaskCard from "./TaskCard";

type ColumnItemProps = {
  data: Column;
};

const ColumnItem = ({ data }: ColumnItemProps) => {
  return (
    <div className="w-72">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="mb-4 uppercase text-lg text-tm-black-300">
          {data.title}
        </h3>
      </div>
      <ul className="flex flex-col gap-4">
        {data.tasks.map((t) => (
          <TaskCard data={t} key={t.id} />
        ))}
      </ul>
    </div>
  );
};

export default ColumnItem;
