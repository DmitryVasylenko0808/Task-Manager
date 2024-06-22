import { CgClose } from "react-icons/cg";
import { Column } from "../api/boards/dto/GetColumnsDTO";
import Button from "./Button";
import TaskCard from "./TaskCard";
import { useModal } from "../hooks/useModal";
import DeleteColumnModal from "./DeleteColumnModal";

type ColumnItemProps = {
  data: Column;
};

const ColumnItem = ({ data }: ColumnItemProps) => {
  const deleteColumnModal = useModal();

  return (
    <div className="w-72">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="uppercase text-lg text-tm-black-300">{data.title}</h3>
        <Button
          size="default"
          variant="terciary"
          className="p-0"
          onClick={deleteColumnModal.onOpen}
        >
          <CgClose size={24} />
        </Button>
      </div>
      <ul className="flex flex-col gap-4">
        {data.tasks.map((t) => (
          <TaskCard data={t} key={t.id} />
        ))}
      </ul>
      <DeleteColumnModal column={data} {...deleteColumnModal} />
    </div>
  );
};

export default ColumnItem;
